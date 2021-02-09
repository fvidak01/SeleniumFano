import { By, Key, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, closeGDPR, delay, getElByCss, getElByID, getElByXPath } from "../../../easifier";

// Starting URL
const rootURL:string = "https://finansavisen.no/";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

// Available WebDrivers
const browserDriver:string = "safari";


it("waits for "+browserDriver+" to start", async ()=>{
    driver = await buildDriver(browserDriver);
    driver.manage().window().maximize();
});

describe((browserDriver+" tests").toUpperCase(), ()=>{
    it("sets up the testing area", async ()=>{
        await driver.get(rootURL);
        expect(await closeGDPR(driver, ttl)). toBeNull();
    });

    it("finds 'Logg inn' in footer and logs in", async ()=>{
        await delay(1000);
        let footer:WebElement = await getElByCss(driver, ttl, "footer");
        await (await footer.findElement(By.partialLinkText("Logg inn"))).click();

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
        await delay(1000);
        let footer:WebElement = await getElByCss(driver, ttl, "footer");
        let el = await footer.findElement(By.partialLinkText("Min side"));
        await delay(500);
        await el.click();

        let temp = await getElByXPath(driver, ttl, "/html/body/div/header/div[2]/nav/div/div/div[2]/a")
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