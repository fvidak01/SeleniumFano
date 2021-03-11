import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, getElByClass, getElByXPath, nOrderStringify } from "../../../easifier";

// Starting URL
const rootURL:string = process.env.CATEGORY_LORDAG;
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

//
// Testing Lordag category subcategories
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

        it("checks if there are 6 links on subheader", async ()=>{
            let subHeader:WebElement = await getElByClass(driver, ttl, "c-subheader__content");
            let links: WebElement[] = await subHeader.findElements(By.css("a"));
            expect(links.length).toBe(6);
        });

        it("checks subheader title link", async ()=>{
            await (await getElByClass(driver, ttl, "c-subheader__title")).click();
            await driver.wait(until.elementLocated(By.className("o-layout")), ttl);
            expect(await driver.getTitle()).toMatch("Lørdag | Finansavisen");
        });

        CheckLink(1, "Gründerintervjuet", "grunderintervjuet");
        CheckLink(2, "Profil");
        CheckLink(3, "Reportasje");
        CheckLink(4, "Ukens selskap", "ukens-selskap");
        CheckLink(5, "Bokanmeldelser");
    
        it("stops "+browserDriver, async ()=>{
            await driver.quit();
        });
    });

    
    async function CheckLink(n:number, item:string, link:string = item.toLowerCase()){
        it("checks if "+nOrderStringify(n)+" link (\'"+item+"\') leads to Lørdag "+item, async ()=>{
            let subcategory:WebElement = await getElByXPath(driver, ttl, "//div[@class='c-subheader__content']/div/div["+n+"]/a")
            expect(await subcategory.getAttribute("textContent")).toMatch(item);
    
            expect(await subcategory.getAttribute("href")).toMatch("/lordag/"+link);
            await subcategory.click();
    
            await driver.wait(until.elementLocated(By.className("o-layout")), ttl);
            expect(await driver.getTitle()).toMatch(item+" - Lørdag | Finansavisen");
        });
    };
});