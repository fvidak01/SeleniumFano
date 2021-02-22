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
// Testing links in 2nd row of Menu dropdown list on header
//

// Available WebDrivers
const browserList:string[] = ["MicrosoftEdge", "chrome", "firefox"];
// const browserList:string[] = ["firefox"];


browserList.forEach(browserDriver =>{
    it("waits for "+browserDriver+" to start", async ()=>{
        if(browserDriver!="MicrosoftEdge")
        driver = await buildDriver(browserDriver);
    else
        driver = await buildEdgeDriver();
    });

    describe((browserDriver+" tests").toUpperCase(), ()=>{
        it("sets up the testing area", async ()=>{
            await driver.get(rootURL);
        });
        
        CheckLink(1, "Nyheter");
        CheckLink(2, "Motor");
        CheckLink(3, "Premium");
        CheckLink(4, "Vext");
        CheckLink(5, "Lørdag", "lordag");
        
        it("checks if 6th link ('Kapital') leads to Kapital", async ()=>{
            let menuButton:WebElement = await GetMenuButton(driver, ttl);
            expect(await menuButton.getAttribute("textContent")).toMatch("E-avis");

            let el:WebElement = await menuButton.findElement(By.linkText("Kapital"));
            expect(await el.getAttribute("href")).toMatch("https://kapital.no/");
            await el.click();

            let tabs = await driver.getAllWindowHandles();
            await driver.switchTo().window(tabs[1]);
            await driver.wait(until.elementLocated(By.id("kapital-index-frontpage-widget")));
            expect(await driver.getTitle()).toMatch("Kapital | kapital.no");
        });
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});

async function CheckLink(n:number, item:string, link:string = item.toLowerCase()){
    it("checks if "+nOrderStringify(n)+" link (\'"+item+"\') leads to Motor "+item, async ()=>{
        let menuButton:WebElement = await GetMenuButton(driver, ttl);
        expect(await menuButton.getAttribute("textContent")).toMatch("E-avis");

        let el:WebElement = await menuButton.findElement(By.linkText(item));

        expect(await el.getAttribute("href")).toMatch("/"+link);
        await el.click();

        await driver.wait(until.elementLocated(By.className("o-section")));
        expect(await driver.getTitle()).toMatch(item+" | Finansavisen");
    });
};