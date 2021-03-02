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
// Testing Motor subcategory links in header
//

// Available WebDrivers
const browserList:string[] = ["firefox", "MicrosoftEdge", "chrome"];
// const browserList:string[] = ["firefox"];


browserList.forEach(browserDriver =>{
    it("waits for "+browserDriver+" to start", async ()=>{
        if(browserDriver!="MicrosoftEdge")
        driver = await buildDriver(browserDriver);
    else
        driver = await buildEdgeDriver();
    });

    describe((browserDriver+" tests").toUpperCase(), ()=>{
        CheckLink(1, "Biltester");
        CheckLink(2, "Klassiske biler", "klassiske-biler");
        CheckLink(3, "Nyheter", "nyheter", "xpath");
        CheckLink(4, "Båt", "bat");
        CheckLink(5, "Reportasjer");
        CheckLink(6, "Gadgets");
        CheckLink(7, "Design og teknikk", "design-og-teknikk");
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});

async function CheckLink(n:number, item:string, link:string = item.toLowerCase(), by:string = "text"){
    it("checks if "+nOrderStringify(n)+" link (\'"+item+"\') leads to Motor "+item, async ()=>{
        await driver.get(rootURL);
        let menuButton:WebElement = await GetMenuButton(driver, ttl);
        expect(await menuButton.getAttribute("textContent")).toMatch("E-avis");

        let el:WebElement;
        if(by === "text")
            el = await menuButton.findElement(By.linkText(item));
        else
            el = await menuButton.findElement(By.xpath(".//nav/div[2]/div/div/div["+n+"]/a"));

        expect(await el.getAttribute("href")).toMatch("/motor/"+link);
        await el.click();

        await driver.wait(until.elementLocated(By.className("o-section")), ttl);
        expect(await driver.getTitle()).toMatch(item+" - Motor | Finansavisen");
    });
};