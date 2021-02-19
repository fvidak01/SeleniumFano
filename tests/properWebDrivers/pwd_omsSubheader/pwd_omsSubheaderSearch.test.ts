import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, getElByID } from "../../../easifier";

// Starting URL
const rootURL:string = process.env.OMS;
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Heavy TODO task. Currently have no more ideas to try to actually test if searching for any and all tickers load proper pages.
// Testing OMS subheader Search, it only tests if 299 tickers are loaded
//

// Available WebDrivers
const browserList:string[] = ["MicrosoftEdge", "chrome", "firefox"];
// const browserList:string[] = ["firefox"];


// let tickers:string[];
// let isTickersEmpty = true;

browserList.forEach(browserDriver =>{
    it("waits for "+browserDriver+" to start", async ()=>{
        if(browserDriver!="MicrosoftEdge")
            driver = await buildDriver(browserDriver);
        else
            driver = await buildEdgeDriver();
    });

    describe((browserDriver+" tests").toUpperCase(), ()=>{
        let tickers:string[]; 
        it("loads tickers if list is empty", async ()=>{
            // if(isTickersEmpty){
                await driver.get(rootURL);
                await driver.wait(until.elementLocated(By.id("oms-search")), ttl);
                
                let searchForm:WebElement = await getElByID(driver, ttl, "oms-search");
                let allTickers:WebElement[] = await searchForm.findElements(By.css("option"));
                tickers = new Array<string>(allTickers.length)
                for (let i=0; i<allTickers.length; i++){
                    tickers[i] = await allTickers[i].getAttribute("value");
                };
                // isTickersEmpty = false;
            // };
        });

        it("checks amount of tickers ", async ()=>{
            expect(tickers.length).toBe(299);
        });
        
        // it("checks if 1st ticker ('2020') leads to correct page", async ()=>{
        //     await driver.get(rootURL);
        //     await driver.wait(until.elementLocated(By.id("oms-search")));
        //     let searchInput:WebElement = await getElByXPath(driver, ttl, "//div[@id='oms-search']/form/input");
        //     await searchInput.click();
        //     await searchInput.sendKeys(tickers[0], Key.TAB);
        //     // let searchBtn:WebElement = await getElByXPath(driver, ttl, "//div[@id='oms-search']/form/button");
        //     // await searchBtn.click();

        //     // await driver.wait(until.elementLocated(By.id("root")));
        //     // expect(await driver.getTitle()).toMatch(ticker.toUpperCase());
        // });
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});

