import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, getElByXPath } from "../../../easifier";

// Starting URL
const rootURL:string = process.env.MENU || "https://finansavisen.no/";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing Motor subcategory links in header
//

// Available WebDrivers
const browserList:string[] = ["firefox", "MicrosoftEdge", "chrome"];
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

        it("checks if 1st link ('Biltester') leads to Motor Biltester", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Biltester"));
            expect(await el.getAttribute("href")).toMatch("/motor/biltester");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Biltester - Motor | Finansavisen");
        });

        it("checks if 2nd link ('Klassiske biler') leads to Motor Klassiske biler", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Klassiske biler"));
            expect(await el.getAttribute("href")).toMatch("/motor/klassiske-biler");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Klassiske biler - Motor | Finansavisen");
        });

        it("checks if 3rd link ('Nyheter') leads to Motor Nyheter", async ()=>{
            let el:WebElement = await menuButton.findElement(By.xpath(".//nav/div[2]/div/div/div[3]/a"));
            expect(await el.getAttribute("href")).toMatch("https://finansavisen.no/motor/nyheter");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Nyheter - Motor | Finansavisen");
        });

        it("checks if 4th link ('Båt') leads to Motor Båt", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Båt"));
            expect(await el.getAttribute("href")).toMatch("/motor/bat");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Båt - Motor | Finansavisen");
        });

        it("checks if 5th link ('Reportasjer') leads to Motor Reportasjer", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Reportasjer"));
            expect(await el.getAttribute("href")).toMatch("/motor/reportasjer");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Reportasjer - Motor | Finansavisen");
        });

        it("checks if 6th link ('Gadgets') leads to Motor Gadgets", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Gadgets"));
            expect(await el.getAttribute("href")).toMatch("/motor/gadgets");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Gadgets - Motor | Finansavisen");
        });

        it("checks if 7th link ('Design og teknikk') leads to Motor Design og teknikk", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Design og teknikk"));
            expect(await el.getAttribute("href")).toMatch("/motor/design-og-teknikk");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Design og teknikk - Motor | Finansavisen");
        });
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});