import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, closeGDPR, getElByID, getElByXPath, nOrderStringify } from "../../../easifier";

// Starting URL
const rootURL:string = process.env.FOOTER;
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing navigation links in footer 
//

// Available WebDrivers
// const browserList:string[] = ["chrome", "firefox", "MicrosoftEdge"];
const browserList:string[] = ["chrome"];


browserList.forEach(browserDriver =>{
    it("waits for "+browserDriver+" to start", async ()=>{
        if(browserDriver!="MicrosoftEdge")
        driver = await buildDriver(browserDriver);
    else
        driver = await buildEdgeDriver();
    });

    describe((browserDriver+" tests").toUpperCase(), ()=>{
        let footerNavLinks:WebElement[];

        it("sets up the testing area", async ()=>{
            await driver.get(rootURL);
            expect(await closeGDPR(driver, ttl)).toBeNull();
        });

        it("checks if links in footer nav are all there", async ()=>{
            let footerNav:WebElement = await getElByID(driver, ttl, "footer");
            footerNavLinks = await footerNav.findElements(By.css("a"));
            expect(footerNavLinks.length).toBe(9);
        });

        it("checks 2nd nav link", async ()=>{
            let el:WebElement = await getElByXPath(driver, ttl, "//nav[@id='footer']/a[2]");
            expect(await el.getAttribute("href")).toMatch("https://annonseweb.finansavisen.no");
            expect(await el.getAttribute("textContent")).toMatch("Annonse");
        });

        it("checks 7th nav link", async ()=>{
            let el:WebElement = await getElByXPath(driver, ttl, "//nav[@id='footer']/a[7]");
            expect(await el.getAttribute("href")).toMatch("https://kapital.no/");
            expect(await el.getAttribute("textContent")).toMatch("Kapital");
        });

        it("checks 8th nav link", async ()=>{
            let el:WebElement = await getElByXPath(driver, ttl, "//nav[@id='footer']/a[8]");
            expect(await el.getAttribute("href")).toMatch("http://www.abcnyheter.no");
            expect(await el.getAttribute("textContent")).toMatch("ABC Nyheter");
        });

        describe("Testing links whose target isn't _blank", ()=>{
            it("checks 1st nav link", async ()=>{
                expect(await footerNavLinks[0].getAttribute("href")).toMatch("/abonnement");
                await footerNavLinks[0].click();
                await driver.wait(until.elementLocated(By.id("subscription-offers")), ttl);
                expect(await driver.getTitle()).toMatch("Abonnement | Finansavisen");
            });
            
            CheckLink(3, "Arkiv");
            CheckLink(4, "Personvern");
            CheckLink(5, "Cookies");
            CheckLink(6, "Vilkår", "/vilkar");
            CheckLink(9, "Om oss", "/om-oss");
        });
        
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});

async function CheckLink(n:number, item:string, link:string="/"+item.toLowerCase()){
    it("checks "+nOrderStringify(n)+" nav link", async ()=>{
        let el:WebElement = await getElByXPath(driver, ttl, "//nav[@id='footer']/a["+n+"]");
        expect(await el.getAttribute("href")).toMatch(link);
        await el.click();
        await driver.wait(until.elementLocated(By.className("c-article__title")), ttl);
        expect(await driver.getTitle()).toMatch(item+" | Finansavisen");
    });
};