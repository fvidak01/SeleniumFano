import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, getElByXPath, nOrderStringify } from "../../../easifier";

// Starting URL
const rootURL:string = process.env.HEADER;
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing header Premium dropdown list
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
        it("sets up the testing area", async ()=>{
            await driver.get(rootURL);
        });

        CheckItem(1, "Alle saker", "/premium", "");
        CheckItem(2, "Lunsjguiden");
        CheckItem(3, "Klokker");
        CheckItem(4, "Mat & drikke", "/mat-og-drikke");
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});

async function CheckItem(
    n:number,
    item:string, 
    link:string=item.toLowerCase(), 
    title:string=item+" - "){
        
        it("checks if "+nOrderStringify(n)+" item (\'"+item+"\') opens correct category", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[6]")
            expect(await category.getAttribute("textContent")).toMatch("Premium");
            await driver.actions({bridge: true}).move({duration:100, origin:category, x:0, y:0}).perform();
            
            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")), ttl);
            let el:WebElement = await category.findElement(By.linkText(item));
            expect(await el.getAttribute("href")).toMatch(link);
            await el.click();   
            await driver.wait(until.elementLocated(By.className("o-section")), ttl);
            expect(await driver.getTitle()).toMatch(title+"Premium | Finansavisen");
        });
};