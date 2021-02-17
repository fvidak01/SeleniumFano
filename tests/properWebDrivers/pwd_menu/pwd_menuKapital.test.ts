import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, getElByXPath } from "../../../easifier";

// Starting URL
const rootURL:string = "https://finansavisen.no";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing Kapital subcategory links in header
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

        if(browserDriver==="firefox")
            afterEach(async ()=>{
                let tabs = await driver.getAllWindowHandles();
                if(tabs.length>1){
                    await driver.close();
                    await driver.switchTo().window(tabs[0]);
                }
            });


        it("checks if 1st link ('Reportasjer') leads to Kapital Reportasjer", async ()=>{
            let el:WebElement = await menuButton.findElement(By.xpath(".//nav/div[7]/div/div/div[1]/a"));
            expect(await el.getAttribute("href")).toMatch("https://kapital.no/");
            await el.click();

            let tabs = await driver.getAllWindowHandles();
            await driver.switchTo().window(tabs[1]);
            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Kapital | kapital.no");
            await driver.close();
            await driver.switchTo().window(tabs[0]);
        });

        it("checks if 2nd link ('Portrett') leads to Kapital Portrett", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Portrett"));
            expect(await el.getAttribute("href")).toMatch("https://kapital.no/portrett");
            await el.click();

            let tabs = await driver.getAllWindowHandles();
            await driver.switchTo().window(tabs[1]);
            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Portrett | Kapital");
            await driver.close();
            await driver.switchTo().window(tabs[0]);
        });

        it("checks if 3rd link ('Inside') leads to Kapital Inside", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Inside"));
            expect(await el.getAttribute("href")).toMatch("https://kapital.no/inside");
            await el.click();

            let tabs = await driver.getAllWindowHandles();
            await driver.switchTo().window(tabs[1]);
            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Inside | Kapital");
            await driver.close();
            await driver.switchTo().window(tabs[0]);
        });

        it("checks if 4th link ('Karriere') leads to Kapital Karriere", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Karriere"));
            expect(await el.getAttribute("href")).toMatch("https://kapital.no/karriere");
            await el.click();

            let tabs = await driver.getAllWindowHandles();
            await driver.switchTo().window(tabs[1]);
            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Karriere | Kapital");
            await driver.close();
            await driver.switchTo().window(tabs[0]);
        });

        it("checks if 5th link ('Tech') leads to Kapital Tech", async ()=>{
            let el:WebElement = await menuButton.findElement(By.xpath(".//nav/div[7]/div/div/div[5]/a"));
            expect(await el.getAttribute("href")).toMatch("https://kapital.no/tech");
            await el.click();

            let tabs = await driver.getAllWindowHandles();
            await driver.switchTo().window(tabs[1]);
            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Tech | Kapital");
            await driver.close();
            await driver.switchTo().window(tabs[0]);
        });

        it("checks if 6th link ('Investor') leads to Kapital Investor", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Investor"));
            expect(await el.getAttribute("href")).toMatch("https://kapital.no/investor");
            await el.click();

            let tabs = await driver.getAllWindowHandles();
            await driver.switchTo().window(tabs[1]);
            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Investor | Kapital");
            await driver.close();
            await driver.switchTo().window(tabs[0]);
        });

        it("checks if 7th link ('Vin') leads to Kapital Vin", async ()=>{
            let el:WebElement = await menuButton.findElement(By.xpath(".//nav/div[7]/div/div/div[7]/a"));
            expect(await el.getAttribute("href")).toMatch("https://kapital.no/vin");
            await el.click();

            let tabs = await driver.getAllWindowHandles();
            await driver.switchTo().window(tabs[1]);
            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Vin | Kapital");
            await driver.close();
            await driver.switchTo().window(tabs[0]);
        });

        it("checks if 8th link ('Reise') leads to Kapital Reise", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Reise"));
            expect(await el.getAttribute("href")).toMatch("https://kapital.no/reise");
            await el.click();

            let tabs = await driver.getAllWindowHandles();
            await driver.switchTo().window(tabs[1]);
            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Reise | Kapital");
            await driver.close();
            await driver.switchTo().window(tabs[0]);
        });
 
        it("checks if 9th link ('KapiTalt-bloggen') leads to Kapital KapiTalt", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("KapiTalt-bloggen"));
            expect(await el.getAttribute("href")).toMatch("https://kapital.no/blogg");
            await el.click();

            let tabs = await driver.getAllWindowHandles();
            await driver.switchTo().window(tabs[1]);
            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("KapiTalt | Kapital");
            await driver.close();
            await driver.switchTo().window(tabs[0]);
        });
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});