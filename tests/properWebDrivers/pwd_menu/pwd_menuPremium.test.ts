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
// Testing Premium subcategory links in header
//

// Available WebDrivers
const browserList:string[] = ["MicrosoftEdge", "firefox", "chrome"];
// const browserList:string[] = ["firefox"];


browserList.forEach(browserDriver =>{
    it("waits for "+browserDriver+" to start", async ()=>{
        if(browserDriver!="MicrosoftEdge")
        driver = await buildDriver(browserDriver);
    else
        driver = await buildEdgeDriver();
    });

    describe((browserDriver+" tests").toUpperCase(), ()=>{

        CheckLink(1, "Lunsjguiden");
        CheckLink(2, "Klokker");
        CheckLink(3, "Sport & Fritid", "sport-og-fritid");
        CheckLink(4, "Design");
        CheckLink(5, "Kunst");
        CheckLink(6, "Kultur", "kultur", "xpath");
        CheckLink(7, "Mat & drikke", "mat-og-drikke");
        CheckLink(8, "Vin");
        CheckLink(9, "Mote");
        CheckLink(10, "Opplevelse");
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});

async function CheckLink(n:number, item:string, link:string = item.toLowerCase(), by:string = "text"){
    it("checks if "+nOrderStringify(n)+" link (\'"+item+"\') leads to Premium "+item, async ()=>{
        await driver.get(rootURL);
        let menuButton:WebElement = await GetMenuButton(driver, ttl);
        expect(await menuButton.getAttribute("textContent")).toMatch("E-avis");

        let el:WebElement;
        if(by === "text")
            el = await menuButton.findElement(By.linkText(item));
        else
            el = await menuButton.findElement(By.xpath(".//nav/div[3]/div/div/div["+n+"]/a"));

        expect(await el.getAttribute("href")).toMatch("/premium/"+link);
        await el.click();

        await driver.wait(until.elementLocated(By.className("o-section")));
        expect(await driver.getTitle()).toMatch(item+" - Premium | Finansavisen");
    });
};