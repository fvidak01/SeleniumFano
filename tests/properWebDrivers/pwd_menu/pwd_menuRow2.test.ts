import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, getElByXPath } from "../../../easifier";

// Starting URL
const rootURL:string = process.env.MENU || "https://finansavisen.no/";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing links in 2nd row of Menu dropdown list on header
//

// Available WebDrivers
const browserList:string[] = ["MicrosoftEdge", "chrome", "firefox"];
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

        it("checks if 1st link ('Nyheter') leads to Nyheter", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Nyheter"));
            expect(await el.getAttribute("href")).toMatch("/nyheter");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Nyheter | Finansavisen");
        });

        it("checks if 2nd link ('Motor') leads to Motor", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Motor"));
            expect(await el.getAttribute("href")).toMatch("/motor");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Motor | Finansavisen");
        });

        it("checks if 3rd link ('Premium') leads to Premium", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Premium"));
            expect(await el.getAttribute("href")).toMatch("/premium");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Premium | Finansavisen");
        });

        it("checks if 4th link ('Vext') leads to Vext", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Vext"));
            expect(await el.getAttribute("href")).toMatch("/vext");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Vext | Finansavisen");
        });

        it("checks if 5th link ('Lørdag') leads to Lørdag", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Lørdag"));
            expect(await el.getAttribute("href")).toMatch("/lordag");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Lørdag | Finansavisen");
        });

        it("checks if 6th link ('Kapital') leads to Kapital", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Kapital"));
            expect(await el.getAttribute("href")).toMatch("https://kapital.no/");
            await el.click();

            let tabs = await driver.getAllWindowHandles();
            await driver.switchTo().window(tabs[1]);
            await driver.wait(until.elementLocated(By.id("kapital-index-frontpage-widget")));
            expect(await driver.getTitle()).toMatch("Kapital | kapital.no");
        });
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});