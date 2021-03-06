import { Key, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, closeGDPR, getElByID, getElByPartialLinkText, getElByXPath } from "../../../easifier";

// Starting URL
const rootURL:string = process.env.LOGIN;
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing if logging in from frontpage header returns to frontpage
//

// Available WebDrivers
// const browserList:string[] = ["MicrosoftEdge", "chrome", "firefox"];
    // Firefox has some psychological issues in logging out and no one in Norway uses it, not worth the time right now
const browserList:string[] = ["MicrosoftEdge", "chrome"];
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
            // await driver.get("https://finansavisen.no/minside");
            let minside = await getElByXPath(driver, ttl, "//div[@id='js-expand-menu']/div/div/a");
            await minside.click()
            .then(async ()=>{
                await (await getElByPartialLinkText(driver, ttl, "Logg ut")).click();
                let el:WebElement = await getElByID(driver, ttl, "js-expand-menu");
                expect(await el.getAttribute("textContent")).toMatch(/Kjøp/);
            })
            .catch(()=>{
                expect(false).toBeTruthy();
            });
        });
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});