import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, closeGDPR, getElByXPath } from "../../../easifier";

// Starting URL
const rootURL:string = "https://finansavisen.no";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing header Motor dropdown list
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

        it("checks if 1st item ('Alle saker') opens correct category", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[7]")
            expect(await category.getAttribute("textContent")).toMatch("Motor");
            await category.click();
            
            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let el:WebElement = await category.findElement(By.linkText("Alle saker"));
            expect(await el.getAttribute("href")).toMatch("/motor");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-layout")));
            expect(await driver.getTitle()).toMatch("Motor | Finansavisen");
        });

        it("checks if 2nd item ('Nyheter') opens correct category", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[7]")
            expect(await category.getAttribute("textContent")).toMatch("Motor");
            await category.click();

            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let el:WebElement = await category.findElement(By.linkText("Nyheter"));
            expect(await el.getAttribute("href")).toMatch("/nyheter");
            await el.click();

            await driver.wait(until.elementLocated(By.className("selected")));
            expect(await driver.getTitle()).toMatch("Nyheter - Motor | Finansavisen");
        });

        it("checks if 3rd item ('Biltester') opens correct category", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[7]")
            expect(await category.getAttribute("textContent")).toMatch("Motor");
            await category.click();

            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let el:WebElement = await category.findElement(By.linkText("Biltester"));
            expect(await el.getAttribute("href")).toMatch("/biltester");
            await el.click();

            await driver.wait(until.elementLocated(By.className("selected")));
            expect(await driver.getTitle()).toMatch("Biltester - Motor | Finansavisen");
        });

        it("checks if 4th item ('Reportasjer') opens correct category", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[7]")
            expect(await category.getAttribute("textContent")).toMatch("Motor");
            await category.click();

            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let el:WebElement = await category.findElement(By.linkText("Reportasjer"));
            expect(await el.getAttribute("href")).toMatch("/reportasjer");
            await el.click();

            await driver.wait(until.elementLocated(By.className("selected")));
            expect(await driver.getTitle()).toMatch("Reportasjer - Motor | Finansavisen");
        });

        it("checks if 5th item ('Klassiske biler') opens correct category", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[7]")
            expect(await category.getAttribute("textContent")).toMatch("Motor");
            await category.click();

            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let el:WebElement = await category.findElement(By.linkText("Klassiske biler"));
            expect(await el.getAttribute("href")).toMatch("/klassiske-biler");
            await el.click();

            await driver.wait(until.elementLocated(By.className("selected")));
            expect(await driver.getTitle()).toMatch("Klassiske biler - Motor | Finansavisen");
        });

        it("checks if 6th item ('Båt') opens correct category", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[7]")
            expect(await category.getAttribute("textContent")).toMatch("Motor");
            await category.click();

            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let el:WebElement = await category.findElement(By.linkText("Båt"));
            expect(await el.getAttribute("href")).toMatch("/bat");
            await el.click();

            await driver.wait(until.elementLocated(By.className("selected")));
            expect(await driver.getTitle()).toMatch("Båt - Motor | Finansavisen");
        });

        it("checks if 7th item ('Gadgets') opens correct category", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[7]")
            expect(await category.getAttribute("textContent")).toMatch("Motor");
            await category.click();

            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let el:WebElement = await category.findElement(By.linkText("Gadgets"));
            expect(await el.getAttribute("href")).toMatch("/gadgets");
            await el.click();

            await driver.wait(until.elementLocated(By.className("selected")));
            expect(await driver.getTitle()).toMatch("Gadgets - Motor | Finansavisen");
        });
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});