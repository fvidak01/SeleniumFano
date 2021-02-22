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
// Testing Lordag subcategory links in header
//

// Available WebDrivers
const browserList:string[] = ["firefox", "chrome", "MicrosoftEdge"];
// const browserList:string[] = ["firefox"];


browserList.forEach(browserDriver =>{
    it("waits for "+browserDriver+" to start", async ()=>{
        if(browserDriver!="MicrosoftEdge")
        driver = await buildDriver(browserDriver);
    else
        driver = await buildEdgeDriver();
    });

    describe((browserDriver+" tests").toUpperCase(), ()=>{

        CheckLink(1, "Gründerintervjuet", "grunderintervjuet");
        CheckLink(2, "Profil");
        CheckLink(3, "Reportasje");
        CheckLink(4, "Ukens selskap", "ukens-selskap");
        CheckLink(5, "Bokanmeldelser");
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});


async function CheckLink(n:number, item:string, link:string = item.toLowerCase()){
    it("checks if "+nOrderStringify(n)+" link (\'"+item+"\') leads to Lørdag "+item, async ()=>{
        await driver.get(rootURL);
        let menuButton:WebElement = await GetMenuButton(driver, ttl);
        expect(await menuButton.getAttribute("textContent")).toMatch("E-avis");

        let el:WebElement = await menuButton.findElement(By.linkText(item));
        expect(await el.getAttribute("href")).toMatch("/lordag/"+link);
        await el.click();

        await driver.wait(until.elementLocated(By.className("o-section")));
        expect(await driver.getTitle()).toMatch(item+" - Lørdag | Finansavisen");
    });
};