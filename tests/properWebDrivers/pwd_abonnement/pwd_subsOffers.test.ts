import{ By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, closeGDPR, getElByClass, getElByPartialLinkText, getElByXPath, Next } from "../../../easifier";

// Starting URL
const rootURL:string = process.env.SUB_OFFERS;
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

// Available WebDrivers
const browserList:string[] = ["chrome", "firefox", "MicrosoftEdge"];
// const browserList:string[] = ["firefox"];

// 
// Testing if Subscription offers go to respective plans
// 

browserList.forEach(browserDriver =>{
    let driver:WebDriver;

    describe((browserDriver+" tests").toUpperCase(), ()=>{
        it("sets up the testing area", async ()=>{
            if(browserDriver !== "MicrosoftEdge")
                driver = await buildDriver(browserDriver);
            else
                driver = await buildEdgeDriver();
            expect(driver).not.toBeNull();

            await driver.get(rootURL);
            expect(await closeGDPR(driver, ttl)).toBeNull();
        });

        describe("Subscription plans", ()=>{
            afterEach(async ()=>{
                await driver.get(rootURL);
            });

            it("if fano is selected when it clicks on 'Bestill na'", async ()=>{
                await (await getElByPartialLinkText(driver, ttl, "Bestill")).click();
                await driver.wait(until.urlContains("?offer=finansavisen"), ttl).catch(()=>console.log("Took too long to connect."));
        
                let el:WebElement = await getElByClass(driver, ttl, "active");
                expect(await el.getAttribute("textContent")).not.toMatch("Kapital");
            });
        
            it("checks if fano+kapital is selected when it clicks on 'Legg til blader Kapital'", async ()=>{
                await (await getElByPartialLinkText(driver, ttl, "Legg til bladet")).click();
                await driver.wait(until.urlContains("?offer=kapitalfinansavisen"), ttl).catch(()=>console.log("Took too long to connect."));
        
                let el:WebElement = await getElByClass(driver, ttl, "active");
                expect(await el.getAttribute("textContent")).toMatch("Finansavisen + Kapital");
            });
    
            it("clicks on special offer and if it leads anywhere", async ()=>{
                let parentEl:WebElement = await getElByClass(driver, ttl, "c-subscription-teaser__right-offer");
                await (await parentEl.findElement(By.className("c-button"))).click();
                await driver.wait(until.urlContains("?offer=finansavisen&plan="), ttl).catch(()=>console.log("Took too long to connect."));
    
                let el:WebElement = await getElByClass(driver, ttl, "active");
                expect(await el.getAttribute("textContent")).toMatch(/[\s\S]*/);
            });
    
            it("clicks on 'Student, eller under 30 ar' offer", async ()=>{
                let parentEl:WebElement = await getElByXPath(driver, ttl, "//section[@id='subscription-offers']/div[1]/div[3]");
                await (await parentEl.findElement(By.className("c-button"))).click();
                await driver.wait(until.urlContains("under-30"), ttl).catch(()=>console.log("Took too long to connect."));
    
                let el:WebElement = await getElByClass(driver, ttl, "c-subscription-form__multipublication__products__subscription");
                expect(await el.getAttribute("textContent")).toMatch("rabatt til deg under 30");
            }); 
    
            it("clicks on 'Finansavisen på lørdag + Motor' offer", async ()=>{
                let parentEl:WebElement = await getElByXPath(driver, ttl, "//section[@id='subscription-offers']/div[1]/div[4]");
                await (await parentEl.findElement(By.className("c-button"))).click();
                await driver.wait(until.urlContains("saturday-motor"), ttl).catch(()=>console.log("Took too long to connect."));
    
                let el:WebElement = await getElByClass(driver, ttl, "c-subscription-form__multipublication__products");
                expect(await el.getAttribute("textContent")).toMatch("Lørdagsabonnement");
            });
    
            it("clicks on 'Fa 30% rabatt' offer ", async ()=>{
                await (await getElByXPath(driver, ttl, "//section[@id='subscription-offers']/div[2]/div[2]/div/div/a")).click();
                await driver.wait(until.urlContains("senior"), ttl).catch(()=>console.log("Took too long to connect."));
    
                let el:WebElement = await getElByClass(driver, ttl, "c-subscription-form__multipublication__products");
                expect(await el.getAttribute("textContent")).toMatch("Pensjonist");
            });
    
            it("clicks on 'Honnor? Bestill na' offer ", async ()=>{
                await (await getElByXPath(driver, ttl, "//section[@id='subscription-offers']/div[2]/div[2]/div/a")).click();
                await driver.wait(until.urlContains("senior"), ttl).catch(()=>console.log("Took too long to connect."));
    
                let el:WebElement = await getElByClass(driver, ttl, "c-subscription-form__multipublication__products");
                expect(await el.getAttribute("textContent")).toMatch("Pensjonist");
            });
        });

        it("clicks on Google Play button and opens the app page", async ()=>{
            let linkList:WebElement[] = await (await getElByClass(driver, ttl, "c-subscription-deal__download-app")).findElements(By.css("a"));
            expect(linkList.length).toBe(2);

            await linkList[1].click();
            let tabs = await driver.getAllWindowHandles();
            await driver.switchTo().window(tabs[1]);

            await driver.wait(until.elementLocated(By.className("id-body-content-beginning")), ttl);
            expect(await driver.getTitle()).toMatch(/Google Play/);

            await Next(driver, tabs[0], browserDriver)
        });

        it("clicks on App Store button and opens the app page", async ()=>{
            let linkList:WebElement[] = await (await getElByClass(driver, ttl, "c-subscription-deal__download-app")).findElements(By.css("a"));
            expect(linkList.length).toBe(2);

            await linkList[0].click();
            let tabs = await driver.getAllWindowHandles();
            await driver.switchTo().window(tabs[1]);

            await driver.wait(until.elementLocated(By.id("modal-container")), ttl);
            expect(await driver.getCurrentUrl()).toMatch("id434568179");
        });

        it("stops "+browserDriver, async ()=>{
            await driver.quit();
        });
    });
});