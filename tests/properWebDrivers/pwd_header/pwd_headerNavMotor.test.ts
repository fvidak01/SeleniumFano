import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, getElByXPath, nOrderStringify } from "../../../easifier";

// Starting URL
const rootURL:string = process.env.HEADER;
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing header Motor dropdown list
//

// Available WebDrivers
const browserList:string[] = ["chrome", "MicrosoftEdge", "firefox"];
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

        CheckItem(1, "Alle saker", "/motor", "");
        CheckItem(2, "Nyheter");
        CheckItem(3, "Biltester");
        CheckItem(4, "Reportasjer");
        CheckItem(5, "Klassiske biler", "/klassiske-biler");
        CheckItem(6, "Båt", "/bat");
        CheckItem(7, "Gadgets");
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});

async function CheckItem(
    n:number,
    item:string,
    link:string = item.toLowerCase(), 
    title:string = item+" - "){

        it("checks if "+nOrderStringify(n)+" item (\'"+item+"\') opens correct category", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[7]")
            expect(await category.getAttribute("textContent")).toMatch("Motor");
            await driver.actions({bridge: true}).move({duration:100, origin:category, x:0, y:0}).perform();
            
            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")), ttl);
            let el:WebElement = await category.findElement(By.linkText(item));
            expect(await el.getAttribute("href")).toMatch(link);
            await el.click();   
            await driver.wait(until.elementLocated(By.className("o-section")), ttl);
            expect(await driver.getTitle()).toMatch(title+"Motor | Finansavisen");
        });
};