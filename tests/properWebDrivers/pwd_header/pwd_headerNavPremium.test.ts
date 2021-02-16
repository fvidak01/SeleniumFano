import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, getElByXPath } from "../../../easifier";

// Starting URL
const rootURL:string = "https://finansavisen.no";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing header Premium dropdown list
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
        });

        it("checks if 1st item ('Alle saker') opens correct category", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[6]")
            expect(await category.getAttribute("textContent")).toMatch("Premium");
            await driver.actions({bridge: true}).move({duration:100, origin:category, x:0, y:0}).perform();
            
            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let el:WebElement = await category.findElement(By.linkText("Alle saker"));
            expect(await el.getAttribute("href")).toMatch("/premium");
            await el.click();   
            await driver.wait(until.elementLocated(By.className("o-layout")));
            expect(await driver.getTitle()).toMatch("Premium | Finansavisen");
        });

        it("checks if 2nd item ('Lunsjguiden') opens correct category", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[6]")
            expect(await category.getAttribute("textContent")).toMatch("Premium");
            await driver.actions({bridge: true}).move({duration:100, origin:category, x:0, y:0}).perform();

            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let el:WebElement = await category.findElement(By.linkText("Lunsjguiden"));
            expect(await el.getAttribute("href")).toMatch("/lunsjguiden");
            await el.click();
            await driver.wait(until.elementLocated(By.className("selected")));
            expect(await driver.getTitle()).toMatch("Lunsjguiden - Premium | Finansavisen");
        });

        it("checks if 3rd item ('Klokker') opens correct category", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[6]")
            expect(await category.getAttribute("textContent")).toMatch("Premium");
            await driver.actions({bridge: true}).move({duration:100, origin:category, x:0, y:0}).perform();

            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let el:WebElement = await category.findElement(By.linkText("Klokker"));
            expect(await el.getAttribute("href")).toMatch("/klokker");
            await el.click();
            await driver.wait(until.elementLocated(By.className("selected")));
            expect(await driver.getTitle()).toMatch("Klokker - Premium | Finansavisen");
        });

        it("checks if 4th item ('Mat & drikke') opens correct category", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[6]")
            expect(await category.getAttribute("textContent")).toMatch("Premium");
            await driver.actions({bridge: true}).move({duration:100, origin:category, x:0, y:0}).perform();

            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let el:WebElement = await category.findElement(By.linkText("Mat & drikke"));
            expect(await el.getAttribute("href")).toMatch("/mat-og-drikke");
            await el.click();
            await driver.wait(until.elementLocated(By.className("selected")));
            expect(await driver.getTitle()).toMatch("Mat & drikke - Premium | Finansavisen");
        });
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});