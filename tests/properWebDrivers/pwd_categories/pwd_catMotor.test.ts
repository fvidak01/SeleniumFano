import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, closeGDPR, getElByClass, getElByXPath, nOrderStringify } from "../../../easifier";

// Starting URL
const rootURL:string = process.env.CATEGORY_MOTOR;
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing Motor category subcategories
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

        it("checks if there are 9 links on subheader", async ()=>{
            let subHeader:WebElement = await getElByClass(driver, ttl, "c-subheader__content");
            let links: WebElement[] = await subHeader.findElements(By.css("a"));
            expect(links.length). toBe(9);
        });

        it("checks subheader title link", async ()=>{
            await (await getElByClass(driver, ttl, "c-subheader__title")).click();
            await driver.wait(until.elementLocated(By.className("o-section")), ttl);
            expect(await driver.getTitle()).toMatch("Motor | Finansavisen");
        });

        CheckLink(1, "Biltester");
        CheckLink(2, "Klassiske biler", "klassiske-biler");
        CheckLink(3, "Nyheter");
        CheckLink(4, "Båt", "bat");
        CheckLink(5, "Reportasjer");
        CheckLink(6, "Gadgets");
        CheckLink(7, "Design og teknikk", "design-og-teknikk");
        CheckLink(8, "Bilkalkulator (betalt innhold)", "autolease");
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});

async function CheckLink(n:number, item:string, link:string = item.toLowerCase()){
    it("checks if "+nOrderStringify(n)+" link (\'"+item+"\') leads to Motor "+item, async ()=>{
        let subcategory:WebElement = await getElByXPath(driver, ttl, "//div[@class='c-subheader__content']/div/div["+n+"]/a")
        expect(await subcategory.getAttribute("textContent")).toMatch(item);

        expect(await subcategory.getAttribute("href")).toMatch("/motor/"+link);
        await subcategory.click();

        await driver.wait(until.elementLocated(By.className("o-layout")), ttl);
        expect(await driver.getTitle()).toMatch(item+" - Motor | Finansavisen");
    });
};