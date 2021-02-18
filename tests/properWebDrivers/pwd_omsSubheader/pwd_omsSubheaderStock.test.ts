import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, getElByID } from "../../../easifier";

// Starting URL
const rootURL:string = process.env.OMS || "https://finansavisen.no/";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing OMS subheader Stock items
//

// Available WebDrivers
const browserList:string[] = ["chrome", "MicrosoftEdge", "firefox"];
// const browserList:string[] = ["firefox"];


browserList.forEach(browserDriver =>{
    it("waits for "+browserDriver+" to start", async ()=>{
        if(browserDriver!="MicrosoftEdge")
            driver = await buildDriver(browserDriver);
        else
            driver = await buildEdgeDriver();
    });

    describe((browserDriver+" tests").toUpperCase(), ()=>{
        CheckStockItems("Oslo Børs", 0);
        CheckStockItems("Brent spot", 1);
        CheckStockItems("US Dollar", 2);
        CheckStockItems("EUR", 3);
        CheckStockItems("GBP", 4);
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});

async function CheckStockItems(item:string, index:number){
    it("checks if link \'"+item+"\' opens Børs", async ()=>{
        await driver.get(rootURL);
        await driver.wait(until.elementLocated(By.id("stock")));
        let stockWrapper:WebElement = await getElByID(driver, ttl, "stock");

        let els = await stockWrapper.findElements(By.css("a"));
        expect(await els[index].getAttribute("href")).toMatch("bors.finansavisen.no");
        await els[index].click();

        await driver.wait(until.elementLocated(By.id("root")));
        expect(await driver.getTitle()).toMatch("Finansavisen");
    });
};