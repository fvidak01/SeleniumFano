import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver } from "../../../easifier";
import { GetMenuButton } from "../../../helperMenu";

// Starting URL
const rootURL:string = process.env.MENU;
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing links in 4th row of Menu dropdown list on header
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

            menuButton = await GetMenuButton(driver, ttl);
            expect(await menuButton.getAttribute("textContent")).toMatch("E-avis");
        });

        it("checks if 'Tips oss' button opens 'Tips oss'", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Tips oss"));
            expect(await el.getAttribute("href")).toMatch("/tips-oss");
            await el.click();

            await driver.wait(until.elementLocated(By.id("tips-us")));
            expect(await driver.getTitle()).toMatch("Tips oss | Finansavisen");
        });

        it("checks if Search gives results", async ()=>{
            let searchBtn:WebElement = await menuButton.findElement(By.className("c-navigation-menu__search__submit"));
            let searchInput:WebElement = await menuButton.findElement(By.className("c-navigation-menu__search__input"));
            expect(await searchBtn.getAttribute("textContent")).toMatch("Søk");

            await searchInput.sendKeys("Anything");
            await searchBtn.click();

            await driver.wait(until.elementLocated(By.id("search-articles")));
            expect(await driver.getTitle()).toMatch("Søk | Finansavisen");
        });
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});