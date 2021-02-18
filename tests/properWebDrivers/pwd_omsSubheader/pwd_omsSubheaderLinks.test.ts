import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, getElByClass } from "../../../easifier";

// Starting URL
const rootURL:string = process.env.OMS || "https://finansavisen.no/";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing OMS subheader links
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
        let subheader:WebElement;

        beforeEach(async ()=>{
            await driver.get(rootURL);
            await driver.wait(until.elementLocated(By.id("stock")));
            subheader = await getElByClass(driver, ttl, "c-oms-content");
        });

        it("checks if 1st link ('Markedsoversikt') opens Bors", async ()=>{
            let el = await subheader.findElement(By.linkText("Markedsoversikt"));
            expect(await el.getAttribute("href")).toMatch("https://bors.finansavisen.no");
            await el.click();

            await driver.wait(until.elementLocated(By.id("root")));
            expect(await driver.getTitle()).toMatch("Finansavisen");
        });

        it("checks if 2nd link ('Kursliste') opens Kursliste", async ()=>{
            let el = await subheader.findElement(By.linkText("Kursliste"));
            expect(await el.getAttribute("href")).toMatch("https://bors.finansavisen.no/NO/kursliste");
            await el.click();

            await driver.wait(until.elementLocated(By.id("root")));
            expect(await driver.getTitle()).toMatch("Fa Børs | Kursliste");
        });

        it("checks if 3rd link ('Valuta') opens Valutakurser", async ()=>{
            let el = await subheader.findElement(By.linkText("Valuta"));
            expect(await el.getAttribute("href")).toMatch("/marked/valutakurser");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Valutakurser | Finansavisen");
        });
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});