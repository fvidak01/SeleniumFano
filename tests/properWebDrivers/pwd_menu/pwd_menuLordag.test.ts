import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, getElByXPath } from "../../../easifier";

// Starting URL
const rootURL:string = process.env.MENU || "https://finansavisen.no/";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing Lordag subcategory links in header
//

// Available WebDrivers
const browserList:string[] = ["firefox", "chrome", "MicrosoftEdge"];
// const browserList:string[] = ["firefox"];


browserList.forEach(browserDriver =>{
    it("waits for "+browserDriver+" to start", async ()=>{
        if(browserDriver!="MicrosoftEdge")
        driver = await buildDriver(browserDriver);
    else
        driver = await buildEdgeDriver();
    });

    describe((browserDriver+" tests").toUpperCase(), ()=>{
        let menuButton:WebElement;

        beforeEach(async ()=>{
            await driver.get(rootURL);

            menuButton = await getElByXPath(driver, ttl, "//div[@class='c-header-bar__toggle-menu']")
            expect(await menuButton.getAttribute("textContent")).toMatch("E-avis");
            await driver.actions({bridge: true}).move({duration:100, origin:menuButton, x:0, y:0}).perform();
            await driver.wait(until.elementIsVisible(menuButton.findElement(By.id("menu-content"))));
        });

        it("checks if 1st link ('Gründerintervjuet') leads to Lørdag Gründerintervjuet", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Gründerintervjuet"));
            expect(await el.getAttribute("href")).toMatch("/lordag/grunderintervjuet");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Gründerintervjuet - Lørdag | Finansavisen");
        });

        it("checks if 2nd link ('Profil') leads to Lørdag Profil", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Profil"));
            expect(await el.getAttribute("href")).toMatch("/lordag/profil");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Profil - Lørdag | Finansavisen");
        });

        it("checks if 3rd link ('Reportasje') leads to Lørdag Reportasje", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Reportasje"));
            expect(await el.getAttribute("href")).toMatch("/lordag/reportasje");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Reportasje - Lørdag | Finansavisen");
        });

        it("checks if 4th link ('Ukens selskap') leads to Lørdag Ukens selskap", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Ukens selskap"));
            expect(await el.getAttribute("href")).toMatch("/lordag/ukens-selskap");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Ukens selskap - Lørdag | Finansavisen");
        });

        it("checks if 5th link ('Bokanmeldelser') leads to Lørdag Bokanmeldelser", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Bokanmeldelser"));
            expect(await el.getAttribute("href")).toMatch("/lordag/bokanmeldelser");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Bokanmeldelser - Lørdag | Finansavisen");
        });
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});