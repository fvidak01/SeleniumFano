import { By, Key, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, closeGDPR, delay, getElByID, getElByPartialLinkText, getElByXPath } from "../../../easifier";


// Starting URL
const rootURL:string = "https://finansavisen.no/";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing if logging in from frontpage header returns to frontpage
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
        expect(await closeGDPR(driver, ttl)).toBeNull();
    });

    it("logs in and returns to the frontpage", async ()=>{
        await (await getElByXPath(driver, ttl, "//div[@id='js-expand-menu']/div/div/a[2]")).click();
        await driver.wait(until.urlContains("connectid.no/user/oauthLogin"), ttl)
            .catch(()=>{
                console.log(browserDriver+" took too long to connect to mediaconnect.id.");
            });

        let emailInput:WebElement = await getElByID(driver, ttl, "j_username");
        await emailInput.sendKeys(process.env.EMAIL, Key.TAB, process.env.PASS);;
        await (await getElByID(driver, ttl, "loginButton")).click();
        await driver.wait(until.urlContains("finansavisen.no"), ttl)
            .then(async ()=>{
                let el:WebElement = await getElByXPath(driver, ttl, "//div[@id='js-expand-menu']/div/div/a");
                expect(await el.getAttribute("textContent")).toMatch("Min side");
            })
            .catch(async ()=>{
                if(await driver.getCurrentUrl() ==="https://finansavisen.no/"){
                    let el:WebElement = await getElByXPath(driver, ttl, "//div[@id='js-expand-menu']/div/div/a");
                    expect(await el.getAttribute("textContent")).toMatch("Min side");
                }else{
                    console.log(browserDriver+" took too long to connect to finansavisen.no.");
                    expect(false).toBeTruthy();
                };
            });
    });

    it("logs out and returns to the frontpage", async ()=>{
        await (await getElByXPath(driver, ttl, "//div[@id='js-expand-menu']/div/div/a")).click();
        let temp = await getElByXPath(driver, ttl, "/html/body/div[1]/header/div[2]/nav/div/div/div[2]/a")
        await temp.click()
            .then(async ()=>{
                // await delay(500);
                await driver.wait(until.elementLocated(By.id("footer")));
                let el:WebElement = await getElByXPath(driver, ttl, "//div[@id='js-expand-menu']/div/div/a");
                expect(await el.getAttribute("textContent")).toMatch("Kjøp");
            });
    });
});

it("stops "+browserDriver, async ()=>{
    await driver.quit();
});
