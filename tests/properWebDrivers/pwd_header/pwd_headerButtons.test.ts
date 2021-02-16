import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, getElByClass, getElByID } from "../../../easifier";

// Starting URL
const rootURL:string = "https://finansavisen.no/";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing header logo and buttons
//

// Available WebDrivers
const browserList:string[] = ["MicrosoftEdge", "chrome", "firefox"];
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
        });

        it("checks if logo leads to frontpage", async ()=>{
            let header:WebElement = await getElByID(driver, ttl, "js-expand-menu");
            let logo:WebElement = await header.findElement(By.className("c-header-bar__logo"));
            expect(await logo.getAttribute("href")).toMatch("/");
            await logo.click();
            await driver.wait(until.elementLocated(By.id("latest-articles-desktop")));
            expect(await driver.getTitle()).toMatch("Finansavisen | fa.no");
        });

        it("checks if two buttons are there and if 'Kjøp' button opens subscriptions page", async ()=>{
            let headerActions:WebElement = await getElByClass(driver, ttl, "c-header-bar__actions");
            let buttons:WebElement[] = await headerActions.findElements(By.className("c-header-bar__button"));
            expect(buttons.length).toBe(2);
            expect(await buttons[0].getAttribute("href")).toMatch("/abonnement");
            await buttons[0].click();
            await driver.wait(until.elementLocated(By.id("subscription-offers")));
            expect(await driver.getCurrentUrl()).toMatch("/abonnement");
        });

        it("checks if two buttons are there and if 'Logg inn' button opens login page", async ()=>{
            driver.navigate().back();
            await driver.wait(until.elementLocated(By.id("latest-articles-desktop")));
            let headerActions:WebElement = await getElByClass(driver, ttl, "c-header-bar__actions");
            let buttons:WebElement[] = await headerActions.findElements(By.className("c-header-bar__button"));
            expect(buttons.length).toBe(2);
            expect(await buttons[1].getAttribute("href")).toMatch("/login");
            await buttons[1].click();
            await driver.wait(until.elementLocated(By.id("j_username")));
            expect(await driver.getCurrentUrl()).toMatch("/oauthLogin");
        });
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});