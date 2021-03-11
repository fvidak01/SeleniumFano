import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, getElByClass, getElByXPath, nOrderStringify } from "../../../easifier";

// Starting URL
const rootURL:string = process.env.CATEGORY_PODCAST;
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

//
// Testing Podcast category subcategories
//

// Available WebDrivers
const browserList:string[] = ["MicrosoftEdge", "firefox", "chrome"];
// const browserList:string[] = ["firefox"];


browserList.forEach(browserDriver =>{
    let driver:WebDriver;

    describe((browserDriver+" tests").toUpperCase(), ()=>{
        it("sets up the testing area", async ()=>{
            if(browserDriver !== "MicrosoftEdge")
                driver = await buildDriver(browserDriver);
            else
                driver = await buildEdgeDriver();
            expect(driver).not.toBeNull();

            await driver.get(rootURL);
        });

        it("checks if there are 7 links on subheader", async ()=>{
            let subHeader:WebElement = await getElByClass(driver, ttl, "c-subheader__content");
            let links: WebElement[] = await subHeader.findElements(By.css("a"));
            expect(links.length).toBe(7);
        });

        it("checks subheader title link", async ()=>{
            await (await getElByClass(driver, ttl, "c-subheader__title")).click();
            await driver.wait(until.elementLocated(By.className("o-layout")), ttl);
            expect(await driver.getTitle()).toMatch("Podcast | Finansavisen");
        });

        CheckLink(1, "Økonominyhetene", "okonominyhetene");
        CheckLink(2, "Mil etter mil", "mil-etter-mil");
        CheckLink(3, "Morgenkaffen");
        CheckLink(4, "Oppsummert");
        CheckLink(5, "Veien hit", "veien-hit");
        CheckLink(6, "Ukens Vin", "ukens-vin");
    
        it("stops "+browserDriver, async ()=>{
            await driver.quit();
        });
    });


    async function CheckLink(n:number, item:string, link:string = item.toLowerCase()){
        it("checks if "+nOrderStringify(n)+" link (\'"+item+"\') leads to Podcast "+item, async ()=>{
            let subcategory:WebElement = await getElByXPath(driver, ttl, "//div[@class='c-subheader__content']/div/div["+n+"]/a")
            expect(await subcategory.getAttribute("textContent")).toMatch(item);

            expect(await subcategory.getAttribute("href")).toMatch("/podcast/"+link);
            await subcategory.click();

            await driver.wait(until.elementLocated(By.className("o-layout")), ttl);
            expect(await driver.getTitle()).toMatch(item+" - Podcast | Finansavisen");
        });
    };
});