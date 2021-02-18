import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, getElByXPath } from "../../../easifier";

// Starting URL
const rootURL:string = process.env.MENU || "https://finansavisen.no/";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing Vext subcategory links in header
//

// Available WebDrivers
const browserList:string[] = ["chrome", "firefox", "MicrosoftEdge"];
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

        it("checks if 1st link ('Gründer') leads to Vext Gründer", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Gründer"));
            expect(await el.getAttribute("href")).toMatch("/vext/grunder");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Gründer - Vext | Finansavisen");
        });

        it("checks if 2nd link ('Tech') leads to Vext Tech", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Tech"));
            expect(await el.getAttribute("href")).toMatch("/vext/tech");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Tech - Vext | Finansavisen");
        });

        it("checks if 3rd link ('TV-serie') leads to Vext TV", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("TV-serie"));
            expect(await el.getAttribute("href")).toMatch("https://vext.finansavisen.no/");
            await el.click();

            let tabs = await driver.getAllWindowHandles();
            await driver.switchTo().window(tabs[1]);
            await driver.wait(until.elementLocated(By.id("6NC9iHpT")));
            expect(await driver.getTitle()).toMatch("Vext - vi kårer årets vekstselskap");
        });
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});