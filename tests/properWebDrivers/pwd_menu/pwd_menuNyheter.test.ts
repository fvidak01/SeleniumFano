import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, getElByXPath } from "../../../easifier";

// Starting URL
const rootURL:string = process.env.MENU || "https://finansavisen.no/";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing Nyheter subcategory links in header
//

// Available WebDrivers
const browserList:string[] = ["chrome", "firefox", "MicrosoftEdge"];
// const browserList:string[] = ["firefox"];


browserList.forEach(browserDriver =>{
    it("waits for "+browserDriver+" to start", async ()=>{
        if(browserDriver!="MicrosoftEdge")
        driver = await buildDriver(browserDriver);
    else
        driver = await buildEdgeDriver();
    });

    describe((browserDriver+" tests").toUpperCase(), ()=>{
        CheckByLinkText("1st", "Aksjeanalyse");
        CheckByLinkText("2nd", "Aktuell");
        CheckByLinkText("3rd", "Arbeidsliv");
        CheckByLinkText("4th", "Bolig");
        CheckByLinkText("5th", "Bygg og anlegg", "bygg-og-anlegg");
        CheckByXPath("6th", "Børs", "//div[@id='menu-content']/nav/div[1]/div/div/div[6]/a", "borsdognet");
        CheckByLinkText("7th", "Debattinnlegg");
        CheckByLinkText("8th", "Energi");
        CheckByLinkText("9th", "Finans");
        CheckByLinkText("10th", "Fritidsbolig");
        CheckByLinkText("11th", "Handel");
        CheckByLinkText("12th", "Helse");
        CheckByLinkText("13th", "Industri");
        CheckByLinkText("14th", "Jus");
        CheckByLinkText("15th", "Kommentar");
        CheckByLinkText("16th", "Krim");
        CheckByLinkText("17th", "Kultur");
        CheckByLinkText("18th", "Landbruk");
        CheckByLinkText("19th", "Luftfart");
        CheckByLinkText("20th", "Makro");
        CheckByLinkText("21st", "Markedskommentarer");
        CheckByLinkText("22nd", "Miljø", "miljo");
        CheckByLinkText("23rd", "Næringseiendom", "naeringseiendom");
        CheckByLinkText("24th", "Næringsliv", "naeringsliv");
        CheckByLinkText("25th", "Offentlig");
        CheckByLinkText("26th", "Olje");
        CheckByLinkText("27th", "Personlig økonomi", "personlig-okonomi");
        CheckByLinkText("28th", "Politikk");
        CheckByLinkText("29th", "Porteføljer", "portefoljer");
        CheckByLinkText("30th", "Reiseliv");
        CheckByLinkText("31st", "Shipping");
        CheckByLinkText("32nd", "Sjømat", "sjomat");
        CheckByLinkText("33rd", "Transport");
        CheckByLinkText("34th", "Utenriks");
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});


async function CheckByLinkText(elNo:string, subcategory:string, link:string=subcategory.toLowerCase()){
    it("checks if "+elNo+" link (\'"+subcategory+"\') leads to Nyheter "+subcategory, async ()=>{
        await driver.get(rootURL);
        let menuButton:WebElement = await getElByXPath(driver, ttl, "//div[@class='c-header-bar__toggle-menu']")
        expect(await menuButton.getAttribute("textContent")).toMatch("E-avis");
        await driver.actions({bridge: true}).move({duration:100, origin:menuButton, x:0, y:0}).perform();
        await driver.wait(until.elementIsVisible(menuButton.findElement(By.id("menu-content"))), ttl);

        let el:WebElement = await menuButton.findElement(By.linkText(subcategory));
        expect(await el.getAttribute("href")).toMatch("/nyheter/"+link);
        await el.click();

        await driver.wait(until.elementLocated(By.className("o-section")), ttl);
        expect(await driver.getTitle()).toMatch(subcategory+" - Nyheter | Finansavisen");
    });
}

async function CheckByXPath(elNo:string, subcategory:string, xpath:string, link:string=subcategory.toLowerCase()){
    it("checks if "+elNo+" link (\'"+subcategory+"\') leads to Nyheter "+subcategory, async ()=>{
        await driver.get(rootURL);
        let menuButton:WebElement = await getElByXPath(driver, ttl, "//div[@class='c-header-bar__toggle-menu']")
        expect(await menuButton.getAttribute("textContent")).toMatch("E-avis");
        await driver.actions({bridge: true}).move({duration:100, origin:menuButton, x:0, y:0}).perform();
        await driver.wait(until.elementIsVisible(menuButton.findElement(By.id("menu-content"))), ttl);

        let el:WebElement = await menuButton.findElement(By.xpath(xpath));
        expect(await el.getAttribute("href")).toMatch("/nyheter/"+link);
        await el.click();

        await driver.wait(until.elementLocated(By.className("o-section")), ttl);
        expect(await driver.getTitle()).toMatch(subcategory+" - Nyheter | Finansavisen");
    });
}