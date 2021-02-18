import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, closeGDPR, delay, getElByXPath } from "../../../easifier";

// Starting URL
const rootURL:string = process.env.MENU || "https://finansavisen.no/";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing links in 1st row of Menu dropdown list on header
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
        let menuButton:WebElement;

        beforeEach(async ()=>{
            await driver.get(rootURL);

            menuButton = await getElByXPath(driver, ttl, "//div[@class='c-header-bar__toggle-menu']")
            expect(await menuButton.getAttribute("textContent")).toMatch("E-avis");
            await driver.actions({bridge: true}).move({duration:100, origin:menuButton, x:0, y:0}).perform();
            await driver.wait(until.elementIsVisible(menuButton.findElement(By.id("menu-content"))));
        });

        it("checks if 1st link ('E-avis') leads to subscription page", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("E-avis"));
            expect(await el.getAttribute("href")).toMatch("/abonnement");
            await el.click();
            await driver.wait(until.elementLocated(By.id("subscription-offers")));
            expect(await driver.getTitle()).toMatch("Abonnement | Finansavisen");
        });

        it("checks if 2nd link ('TV') leads to FA TV", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("TV"));
            expect(await el.getAttribute("href")).toMatch("/fatv");
            await el.click();
            await driver.wait(until.elementLocated(By.css("iframe")));
            expect(await driver.getTitle()).toMatch("FaTV | Finansavisen");
        });

        it("checks if 3rd link ('Forum') leads to Forum", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Forum"));
            expect(await el.getAttribute("href")).toMatch("/forum");
            await el.click();
            await driver.wait(until.elementLocated(By.id("container-top")));
            expect(await driver.getTitle()).toMatch("Finansavisen Forum");
        });

        it("checks if 4th link ('Børs') leads to Børs", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Børs"));
            expect(await el.getAttribute("href")).toMatch("https://bors.finansavisen.no/");
            await el.click();
            let tabs = await driver.getAllWindowHandles();
            await driver.switchTo().window(tabs[1]);
            await driver.wait(until.elementLocated(By.id("root")));
            expect(await driver.getTitle()).toMatch("Finansavisen");
        });
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});