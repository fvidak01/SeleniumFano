import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, getElByXPath } from "../../../easifier";

// Starting URL
const rootURL:string = process.env.HEADER;
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing header Podcast dropdown list
//

// Available WebDrivers
const browserList:string[] = ["firefox", "chrome", "MicrosoftEdge"];
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

        CheckNumber("Nyheter", 2, 10);
        CheckNumber("Premium", 6, 4);
        CheckNumber("Motor", 7, 7);
        CheckNumber("Podcast", 8, 7);
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});

async function CheckNumber(item:string, n:number, expected:number){
    it("checks number of "+item+" categories", async ()=>{
        let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li["+n+"]")
        expect(await category.getAttribute("textContent")).toMatch(item);
        await driver.actions({bridge: true}).move({duration:100, origin:category, x:0, y:0}).perform();
        
        await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")), ttl);
        let els:WebElement[] = await category.findElements(By.css("li"));
        expect(els.length).toBe(expected);
    });
};