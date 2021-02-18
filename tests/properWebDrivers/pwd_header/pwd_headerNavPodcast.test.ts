import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, getElByXPath } from "../../../easifier";

// Starting URL
const rootURL:string = process.env.HEADER || "https://finansavisen.no";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing header Podcast dropdown list
//

// Available WebDrivers
const browserList:string[] = ["chrome", "MicrosoftEdge", "firefox"];
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
        });

        it("checks if 1st item ('Alle saker') opens correct category", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[8]")
            expect(await category.getAttribute("textContent")).toMatch("Podcast");
            await driver.actions({bridge: true}).move({duration:100, origin:category, x:0, y:0}).perform();
            
            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let el:WebElement = await category.findElement(By.linkText("Alle saker"));
            expect(await el.getAttribute("href")).toMatch("/podcast");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Podcast | Finansavisen");
        });

        it("checks if 2nd item ('Økonominyhetene') opens correct category", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[8]")
            expect(await category.getAttribute("textContent")).toMatch("Podcast");
            await driver.actions({bridge: true}).move({duration:100, origin:category, x:0, y:0}).perform();

            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let el:WebElement = await category.findElement(By.linkText("Økonominyhetene"));
            expect(await el.getAttribute("href")).toMatch("/okonominyhetene");
            await el.click();

            await driver.wait(until.elementLocated(By.className("selected")));
            expect(await driver.getTitle()).toMatch("Økonominyhetene - Podcast | Finansavisen");
        });

        it("checks if 3rd item ('Mil etter mil') opens correct category", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[8]")
            expect(await category.getAttribute("textContent")).toMatch("Podcast");
            await driver.actions({bridge: true}).move({duration:100, origin:category, x:0, y:0}).perform();

            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let el:WebElement = await category.findElement(By.linkText("Mil etter mil"));
            expect(await el.getAttribute("href")).toMatch("/mil-etter-mil");
            await el.click();

            await driver.wait(until.elementLocated(By.className("selected")));
            expect(await driver.getTitle()).toMatch("Mil etter mil - Podcast | Finansavisen");
        });

        it("checks if 4th item ('Morgenkaffen') opens correct category", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[8]")
            expect(await category.getAttribute("textContent")).toMatch("Podcast");
            await driver.actions({bridge: true}).move({duration:100, origin:category, x:0, y:0}).perform();

            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let el:WebElement = await category.findElement(By.linkText("Morgenkaffen"));
            expect(await el.getAttribute("href")).toMatch("/morgenkaffen");
            await el.click();

            await driver.wait(until.elementLocated(By.className("selected")));
            expect(await driver.getTitle()).toMatch("Morgenkaffen - Podcast | Finansavisen");
        });
    });
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});