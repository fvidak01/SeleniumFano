import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, closeGDPR, getElByXPath } from "../../../easifier";

// Starting URL
const rootURL:string = "https://finansavisen.no";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing header Podcast dropdown list
//

// Available WebDrivers
// const browserList:string[] = ["chrome", "MicrosoftEdge", "firefox"];
    // Firefox is a mess
const browserList:string[] = ["chrome", "MicrosoftEdge"];
// const browserList:string[] = ["chrome"];


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

        it("checks number of Nyheter categories", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[2]")
            expect(await category.getAttribute("textContent")).toMatch("Nyheter");
            await category.click();
            
            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let els:WebElement[] = await category.findElements(By.css("li"));
            expect(els.length).toBe(10);
        });

        it("checks number of Premium categories", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[6]")
            expect(await category.getAttribute("textContent")).toMatch("Premium");
            await category.click();
            
            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let els:WebElement[] = await category.findElements(By.css("li"));
            expect(els.length).toBe(4);
        });

        it("checks number of Motor categories", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[7]")
            expect(await category.getAttribute("textContent")).toMatch("Motor");
            await category.click();
            
            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let els:WebElement[] = await category.findElements(By.css("li"));
            expect(els.length).toBe(7);
        });

        it("checks number of Podcast categories", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[8]")
            expect(await category.getAttribute("textContent")).toMatch("Podcast");
            await category.click();
            
            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let els:WebElement[] = await category.findElements(By.css("li"));
            expect(els.length).toBe(4);
        });
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});