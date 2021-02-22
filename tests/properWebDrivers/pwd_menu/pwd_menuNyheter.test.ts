import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, nOrderStringify } from "../../../easifier";
import { GetMenuButton } from "../../../helperMenu";

// Starting URL
const rootURL:string = process.env.MENU;
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

        CheckLink(1, "Aksjeanalyse");
        CheckLink(2, "Aktuell");
        CheckLink(3, "Arbeidsliv");
        CheckLink(4, "Bolig");
        CheckLink(5, "Bygg og anlegg", "bygg-og-anlegg");
        CheckLink(6, "Børs", "borsdognet", "xpath");
        CheckLink(7, "Debattinnlegg");
        CheckLink(8, "Energi");
        CheckLink(9, "Finans");
        CheckLink(10, "Fritidsbolig");
        CheckLink(11, "Handel");
        CheckLink(12, "Helse");
        CheckLink(13, "Industri");
        CheckLink(14, "Jus");
        CheckLink(15, "Kommentar");
        CheckLink(16, "Krim");
        CheckLink(17, "Kultur");
        CheckLink(18, "Landbruk");
        CheckLink(19, "Luftfart");
        CheckLink(20, "Makro");
        CheckLink(21, "Markedskommentarer");
        CheckLink(22, "Miljø", "miljo");
        CheckLink(23, "Næringseiendom", "naeringseiendom");
        CheckLink(24, "Næringsliv", "naeringsliv");
        CheckLink(25, "Offentlig");
        CheckLink(26, "Olje");
        CheckLink(27, "Personlig økonomi", "personlig-okonomi");
        CheckLink(28, "Politikk");
        CheckLink(29, "Porteføljer", "portefoljer");
        CheckLink(30, "Reiseliv");
        CheckLink(31, "Shipping");
        CheckLink(32, "Sjømat", "sjomat");
        CheckLink(33, "Transport");
        CheckLink(34, "Utenriks");
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});


async function CheckLink(n:number, subcategory:string, link:string=subcategory.toLowerCase(), by:string="text"){
    it("checks if "+nOrderStringify(n)+" link (\'"+subcategory+"\') leads to Nyheter "+subcategory, async ()=>{
        await driver.get(rootURL);
        let menuButton:WebElement = await GetMenuButton(driver, ttl);
        expect(await menuButton.getAttribute("textContent")).toMatch("E-avis");

        let el:WebElement;
        if(by === "text")
            el = await menuButton.findElement(By.linkText(subcategory));
        else
            el = await menuButton.findElement(By.xpath(".//nav/div[1]/div/div/div["+n+"]/a"));

        expect(await el.getAttribute("href")).toMatch("/nyheter/"+link);
        await el.click();

        await driver.wait(until.elementLocated(By.className("o-section")), ttl);
        expect(await driver.getTitle()).toMatch(subcategory+" - Nyheter | Finansavisen");
    });
}