import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, getElByXPath } from "../../../easifier";

// Starting URL
const rootURL:string = process.env.MENU || "https://finansavisen.no/";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing Premium subcategory links in header
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
        let menuButton:WebElement;

        beforeEach(async ()=>{
            await driver.get(rootURL);

            menuButton = await getElByXPath(driver, ttl, "//div[@class='c-header-bar__toggle-menu']")
            expect(await menuButton.getAttribute("textContent")).toMatch("E-avis");
            await driver.actions({bridge: true}).move({duration:100, origin:menuButton, x:0, y:0}).perform();
            await driver.wait(until.elementIsVisible(menuButton.findElement(By.id("menu-content"))));
        });

        it("checks if 1st link ('Lunsjguiden') leads to Premium Lunsjguiden", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Lunsjguiden"));
            expect(await el.getAttribute("href")).toMatch("/premium/lunsjguiden");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Lunsjguiden - Premium | Finansavisen");
        });

        it("checks if 2nd link ('Klokker') leads to Premium Klokker", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Klokker"));
            expect(await el.getAttribute("href")).toMatch("/premium/klokker");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Klokker - Premium | Finansavisen");
        });

        it("checks if 3rd link ('Sport & Fritid') leads to Premium Sport & Fritid", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Sport & Fritid"));
            expect(await el.getAttribute("href")).toMatch("/premium/sport-og-fritid");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Sport & Fritid - Premium | Finansavisen");
        });

        it("checks if 4th link ('Design') leads to Premium Design", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Design"));
            expect(await el.getAttribute("href")).toMatch("/premium/design");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Design - Premium | Finansavisen");
        });

        it("checks if 5th link ('Kunst') leads to Premium Kunst", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Kunst"));
            expect(await el.getAttribute("href")).toMatch("/premium/kunst");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Kunst - Premium | Finansavisen");
        });

        it("checks if 6th link ('Kultur') leads to Premium Kultur", async ()=>{
            let el:WebElement = await menuButton.findElement(By.xpath(".//nav/div[3]/div/div/div[6]/a"));
            expect(await el.getAttribute("href")).toMatch("/premium/kultur");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Kultur - Premium | Finansavisen");
        });

        it("checks if 7th link ('Mat & drikke') leads to Premium Mat & drikke", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Mat & drikke"));
            expect(await el.getAttribute("href")).toMatch("/premium/mat-og-drikke");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Mat & drikke - Premium | Finansavisen");
        });

        it("checks if 8th link ('Vin') leads to Premium Vin", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Vin"));
            expect(await el.getAttribute("href")).toMatch("/premium/vin");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Vin - Premium | Finansavisen");
        });

        it("checks if 9th link ('Mote') leads to Premium Mote", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Mote"));
            expect(await el.getAttribute("href")).toMatch("/premium/mote");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Mote - Premium | Finansavisen");
        });

        it("checks if 10th link ('Opplevelse') leads to Premium Opplevelse", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Opplevelse"));
            expect(await el.getAttribute("href")).toMatch("/premium/opplevelse");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Opplevelse - Premium | Finansavisen");
        });
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});