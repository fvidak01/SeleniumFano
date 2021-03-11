import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, getElByClass, getElByXPath, nOrderStringify } from "../../../easifier";

// Starting URL
const rootURL:string = process.env.CATEGORY_VEXT;
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

//
// Testing Motor category subcategories
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

        it("checks if there are 4 links on subheader", async ()=>{
            let subHeader:WebElement = await getElByClass(driver, ttl, "c-subheader__content");
            let links: WebElement[] = await subHeader.findElements(By.css("a"));
            expect(links.length). toBe(4);
        });

        it("checks subheader title link", async ()=>{
            await (await getElByClass(driver, ttl, "c-subheader__title")).click();
            await driver.wait(until.elementLocated(By.className("o-section")), ttl);
            expect(await driver.getTitle()).toMatch("Vext | Finansavisen");
        });

        CheckLink(1, "Gründer", "grunder");
        CheckLink(2, "Tech");
        CheckLink(3, "TV-serie", "tv-serie", "p6NC9iHpT", "Vext - vi kårer årets vekstselskap");
    
        it("stops "+browserDriver, async ()=>{
            await driver.quit();
        });
    });


    async function CheckLink(
        n:number, 
        item:string, 
        link:string = item.toLowerCase(), 
        eleClassName:string = "o-layout",
        matchTitle: string = item+" - Vext | Finansavisen"){

            it("checks if "+nOrderStringify(n)+" link (\'"+item+"\') leads to Vext "+item, async ()=>{
                let subcategory:WebElement = await getElByXPath(driver, ttl, "//div[@class='c-subheader__content']/div/div["+n+"]/a")
                expect(await subcategory.getAttribute("textContent")).toMatch(item);

                expect(await subcategory.getAttribute("href")).toMatch("/vext/"+link);
                await subcategory.click();

                await driver.wait(until.elementLocated(By.className(eleClassName)), ttl);
                expect(await driver.getTitle()).toMatch(matchTitle);
            });
    };
});