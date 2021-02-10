import { Key, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, closeGDPR, delay, getElByClass, getElByID, getElByXPath } from "../../../easifier";

// Starting URL
const rootURL:string = "https://fa.no/7622333/";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing if logging in from article body returns to article
//

// Available WebDrivers
const browserDriver:string = "safari";


it("waits for "+browserDriver+" to start", async ()=>{
    driver = await buildDriver(browserDriver);
    driver.manage().window().maximize();
});

describe((browserDriver+" tests").toUpperCase(), ()=>{
    it("sets up the testing area", async ()=>{
        await driver.get(rootURL);
        await closeGDPR(driver, ttl);
    });
    
    it("logs in from article body", async ()=>{
        await (await getElByClass(driver, ttl, "c-paywall__login-btn")).click();

        await driver.wait(until.urlContains("connectid.no/user/oauthLogin"), ttl)
            .catch(()=>{
                console.log(browserDriver+" took too long to connect to mediaconnect.id.");
                expect(false).toBeTruthy();
            });
        let emailInput:WebElement = await getElByID(driver, ttl, "j_username");
        await emailInput.sendKeys(process.env.EMAIL, Key.TAB, process.env.PASS);;
        await (await getElByID(driver, ttl, "loginButton")).click();

        await driver.wait(until.urlContains("finansavisen.no"), ttl)
        .then(async ()=>{
            await getElByClass(driver, ttl, "c-paywall__title-access")
            .then(async (el)=>{
                expect(await el.getAttribute("textContent")).toMatch("gyldig abonnement");
            })
            .catch((e)=>{
                console.log(e);
                expect(false).toBeTruthy();
            });
        });
    });

    it("logs out and returns to the frontpage", async ()=>{
        await driver.get("https://finansavisen.no/minside");
        let temp = await getElByXPath(driver, ttl, "/html/body/div[1]/header/div[2]/nav/div/div/div[2]/a")
        await temp.click()
            .then(async ()=>{
                await delay(750);
                let el:WebElement = await getElByXPath(driver, ttl, "//div[@id='js-expand-menu']/div/div/a");
                expect(await el.getAttribute("textContent")).toMatch("Kjøp");
            });
    });
});

it("stops "+browserDriver, ()=>{
    driver.quit();
});