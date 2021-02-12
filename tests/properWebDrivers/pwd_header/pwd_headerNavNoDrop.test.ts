import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, closeGDPR, getElByXPath } from "../../../easifier";

// Starting URL
const rootURL:string = "https://finansavisen.no/";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing header items without dropdown lists on them
//

// Available WebDrivers
const browserList:string[] = ["firefox", "chrome", "MicrosoftEdge"];
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

        it("checks 1st ('Tips oss') nav link", async ()=>{
            let el:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[1]/a");
            expect(await el.getAttribute("href")).toMatch("mailto:tips@finansavisen.no");
            expect(await el.getAttribute("textContent")).toMatch("Tips oss");
        });

        describe("Testing items without dropdowns", ()=>{
            it("checks 3rd ('Børs') nav link", async ()=>{
                let el:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[3]/a");
                expect(await el.getAttribute("href")).toMatch("https://bors.finansavisen.no/");
                await el.click();
                await driver.wait(until.elementLocated(By.id("root")));
                expect(await driver.getTitle()).toMatch("Finansavisen");
            });

            it("checks 4th ('Forum') nav link", async ()=>{
                let el:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[4]/a");
                expect(await el.getAttribute("href")).toMatch("/forum");
                await el.click();
                await driver.wait(until.elementLocated(By.id("container-top")));
                expect(await driver.getTitle()).toMatch("Finansavisen Forum");
            });
            
            it("checks 5th ('TV') nav link", async ()=>{
                let el:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[5]/a");
                expect(await el.getAttribute("href")).toMatch("/fatv");
                await el.click();
                await driver.wait(until.elementLocated(By.css("iframe")));
                expect(await driver.getTitle()).toMatch("FaTV | Finansavisen");
            });

            afterEach(async ()=>{
                await driver.navigate().back();
                await driver.wait(until.elementLocated(By.className("c-header-bar-nav__list")));
            });
        });
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});