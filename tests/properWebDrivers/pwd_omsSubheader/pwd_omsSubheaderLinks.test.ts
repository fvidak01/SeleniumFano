import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, getElByClass, nOrderStringify } from "../../../easifier";

// Starting URL
const rootURL:string = process.env.OMS;
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
        CheckLink(1, "Markedsoversikt", "Bors", "Finansavisen", "bors.finansavisen.no");
        CheckLink(2, "Kursliste", "Kursliste", "Fa Børs | Kursliste", "bors.finansavisen.no/NO/kursliste");

        it("checks if 3rd link ('Valuta') opens Valutakurser", async ()=>{
            await driver.get(rootURL);
            await driver.wait(until.elementLocated(By.id("stock")), ttl);
            let subheader:WebElement = await getElByClass(driver, ttl, "c-oms-content");
            let el = await subheader.findElement(By.linkText("Valuta"));
            expect(await el.getAttribute("href")).toMatch("/marked/valutakurser");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")), ttl);
            expect(await driver.getTitle()).toMatch("Valutakurser | Finansavisen");
        });
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});

async function CheckLink(n:number, link:string, location:string=link, matchTitle:string, matchLink:string){
    it("checks if "+nOrderStringify(n)+" link (\'"+link+"\') opens "+location, async ()=>{
        await driver.get(rootURL);
        await driver.wait(until.elementLocated(By.id("stock")), ttl);
        let subheader:WebElement = await getElByClass(driver, ttl, "c-oms-content");
        let el = await subheader.findElement(By.linkText(link));
        expect(await el.getAttribute("href")).toMatch(matchLink);
        await el.click();

        await driver.wait(until.elementLocated(By.id("root")), ttl);
        expect(await driver.getTitle()).toMatch(matchTitle);
    });
};