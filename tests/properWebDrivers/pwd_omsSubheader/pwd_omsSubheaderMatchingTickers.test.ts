import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, delay, getElByClass, getElByID, getElByXPath } from "../../../easifier";

// Starting URL
const rootURL: string = process.env.OMS;
const borsURL: string = process.env.BORS;
// in ms
const ttl: number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60;

let driver:WebDriver;

//
// Testing OMS subheader Search, if it has same tickers as bors
//

// Available WebDrivers
const browserList: string[] = ["MicrosoftEdge", "chrome", "firefox"];
// const browserList: string[] = ["MicrosoftEdge"];


browserList.forEach(browserDriver =>{
    it("waits for "+browserDriver+" to start", async ()=>{
        if(browserDriver != "MicrosoftEdge")
            driver = await buildDriver(browserDriver);
        else
            driver = await buildEdgeDriver();
    });

    describe((browserDriver+" tests").toUpperCase(), ()=>{
        let fanoTickers: string[]; 
        let borsTickers: string[];
        it("loads tickers from Finansavisen ticker search", async ()=>{
            await driver.get(rootURL);
            let searchForm: WebElement = await driver.wait(until.elementLocated(By.id("tickers")), ttl);
            let searchElements: WebElement[] = await searchForm.findElements(By.css("option"));

            fanoTickers = new Array<string>(searchElements.length);
            for(let i=0; i<searchElements.length; i++){
                fanoTickers[i] = await searchElements[i].getAttribute("value");
            };
        });

        it("loads tickers on bors", async ()=>{
            await driver.get(borsURL);
            await (await getElByID(driver, 5000, "market")).click();
            await (await getElByID(driver, 5000, "downshift-10-item-0")).click();
            let tickerTablebody: WebElement = await getElByClass(driver, ttl, "QuotelistComponent");
            // Chromium WebDrivers do not wait so tickerShortNames remains empty thus a fix
            if (browserDriver != "firefox")
                await delay(500);
            let tickerShortNames: WebElement[] = await tickerTablebody.findElements(By.className("css-19d5w01"));
            
            borsTickers = new Array<string>(tickerShortNames.length);
            for(let i=0; i<tickerShortNames.length; i++){
                borsTickers[i] = await tickerShortNames[i].getAttribute("textContent");
            };
        });

        it("compares if they have same tickers", async ()=>{
            expect(borsTickers.length).toBe(fanoTickers.length);

            borsTickers.forEach(ticker =>{
                expect(fanoTickers).toContain(ticker);
            });

            fanoTickers.forEach(ticker =>{
                expect(borsTickers).toContain(ticker);
            });
        });
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});
