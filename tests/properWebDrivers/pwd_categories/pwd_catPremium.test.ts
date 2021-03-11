import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, getElByClass, getElByXPath, nOrderStringify } from "../../../easifier";

// Starting URL
const rootURL:string = process.env.CATEGORY_PREMIUM;
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

        it("checks if there are 14 links on subheader", async ()=>{
            let subHeader:WebElement = await getElByClass(driver, ttl, "c-subheader__content");
            let links: WebElement[] = await subHeader.findElements(By.css("a"));
            expect(links.length).toBe(14);
        });

        it("checks subheader title link", async ()=>{
            await (await getElByClass(driver, ttl, "c-subheader__title")).click();
            await driver.wait(until.elementLocated(By.className("o-layout")), ttl);
            expect(await driver.getTitle()).toMatch("Premium | Finansavisen");
        });

        CheckLink(1, "Lunsjguiden");
        CheckLink(3, "Klokker");
        CheckLink(4, "Sport & Fritid", "sport-og-fritid");
        CheckLink(5, "Design");
        CheckLink(6, "Kunst");
        CheckLink(7, "Kultur");
        CheckLink(8, "Mat & drikke", "mat-og-drikke");
        CheckLink(9, "Vin");
        CheckLink(10, "Mote");
        CheckLink(11, "Opplevelse");
    
        it("stops "+browserDriver, async ()=>{
            await driver.quit();
        });
    });


    async function CheckLink(n:number, item:string, link:string = item.toLowerCase()){
        it("checks if "+nOrderStringify(n)+" link (\'"+item+"\') leads to Premium "+item, async ()=>{
            let subcategory:WebElement = await getElByXPath(driver, ttl, "//div[@class='c-subheader__content']/div/div["+n+"]/a")
            expect(await subcategory.getAttribute("textContent")).toMatch(item);

            expect(await subcategory.getAttribute("href")).toMatch("/premium/"+link);
            await subcategory.click();

            await driver.wait(until.elementLocated(By.className("o-layout")), ttl);
            expect(await driver.getTitle()).toMatch(item+" - Premium | Finansavisen");
        });
    };
});