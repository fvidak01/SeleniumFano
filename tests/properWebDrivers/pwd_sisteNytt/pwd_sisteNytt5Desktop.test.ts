import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, closeGDPR, getElByID, getElByXPath, Next, nOrderStringify } from "../../../easifier";

// Starting URL
const rootURL:string = process.env.SISTENYTT;
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing 5 latest Siste Nytt articles if they show error page
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
        it("sets up the testing area", async ()=>{
            await driver.get(rootURL);
            expect(await closeGDPR(driver, ttl)).toBeNull();
        });

        for (let i=5; i>0; i--){
            CheckItem(i);
        };
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});

async function CheckItem(n:number){
    it("checks "+nOrderStringify(n)+" item in Siste Nytt", async ()=>{
        let item:WebElement = await getElByXPath(driver, ttl, "//div[@id='latest-articles-desktop']/div[2]/div/a["+n+"]");
        await item.click();

        await driver.wait(until.elementLocated(By.className("o-layout")));
        expect(await driver.getTitle()).not.toMatch(/404: Not Found/);

        await driver.navigate().back();
        await driver.wait(until.elementLocated(By.id("latest-articles-desktop")))
    });
};