import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, closeGDPR, getElByID, getElByXPath } from "../../../easifier";

// Starting URL
const rootURL:string = "https://finansavisen.no/";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing navigation links in footer 
//

// Available WebDrivers
const browserList:string[] = ["chrome", "firefox", "MicrosoftEdge"];
// const browserList:string[] = ["chrome"];


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
                await driver.wait(until.elementLocated(By.id("subscription-offers")));
                expect(await driver.getTitle()).toMatch("Abonnement | Finansavisen");
            });

            it("checks 3rd nav link", async ()=>{
                let el:WebElement = await getElByXPath(driver, ttl, "//nav[@id='footer']/a[3]");
                expect(await el.getAttribute("href")).toMatch("/arkiv");
                await el.click();
                await driver.wait(until.elementLocated(By.className("c-article__title")));
                expect(await driver.getTitle()).toMatch("Arkiv | Finansavisen");
            });

            it("checks 4th nav link", async ()=>{
                let el:WebElement = await getElByXPath(driver, ttl, "//nav[@id='footer']/a[4]");
                expect(await el.getAttribute("href")).toMatch("/personvern");
                await el.click();
                await driver.wait(until.elementLocated(By.className("c-article__title")));
                expect(await driver.getTitle()).toMatch("Personvern | Finansavisen");
            });

            it("checks 5th nav link", async ()=>{
                let el:WebElement = await getElByXPath(driver, ttl, "//nav[@id='footer']/a[5]");
                expect(await el.getAttribute("href")).toMatch("/cookies");
                await el.click();
                await driver.wait(until.elementLocated(By.className("c-article__title")));
                expect(await driver.getTitle()).toMatch("Cookies | Finansavisen");
            });
            
            it("checks 6th nav link", async ()=>{
                let el:WebElement = await getElByXPath(driver, ttl, "//nav[@id='footer']/a[6]");
                expect(await el.getAttribute("href")).toMatch("/vilkar");
                await el.click();
                await driver.wait(until.elementLocated(By.className("c-article__title")));
                expect(await driver.getTitle()).toMatch("Vilkår | Finansavisen");
            });
            
            it("checks 9th nav link", async ()=>{
                let el:WebElement = await getElByXPath(driver, ttl, "//nav[@id='footer']/a[9]");
                expect(await el.getAttribute("href")).toMatch("/om-oss");
                await el.click();
                await driver.wait(until.elementLocated(By.className("c-article__title")));
                expect(await driver.getTitle()).toMatch("Om oss | Finansavisen");
            });

            afterEach(async ()=>{
                await driver.navigate().back();
                await driver.wait(until.elementLocated(By.id("footer")));
            });
        });
        
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});