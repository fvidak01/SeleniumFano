import{ By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, closeGDPR, getElByClass, getElByPartialLinkText, getElByXPath } from "../../../easifier";

// Starting URL
const rootURL:string = "https://finansavisen.no/abonnement";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

// Available WebDrivers
const browserDriver:string = "safari";

let el:WebElement,
    driver:WebDriver;

// 
// Testing if Subscription offers go to respective plans
// 

it("waits for "+browserDriver+" to start", async ()=>{
    driver = await buildDriver(browserDriver);
});

describe((browserDriver+" tests").toUpperCase(), ()=>{
    beforeEach(async ()=>{
        await driver.get(rootURL);
    });

    it("closes GDPR notice", async ()=>{
        await closeGDPR(driver, ttl);
    });

    it("clicks on 'Bestill na' and fano is selected", async ()=>{
        await (await getElByPartialLinkText(driver, ttl, "Bestill")).click();
        await driver.wait(until.urlContains("?offer=finansavisen"), ttl).catch(()=>console.log("Took too long to connect."));

        el = await getElByClass(driver, ttl, "active");
        expect(await el.getText()).not.toMatch("Kapital");
    });

    it("clicks on 'Legg til blader Kapital' and fano+kapital is selected", async ()=>{
        await (await getElByPartialLinkText(driver, ttl, "Legg til bladet")).click();
        await driver.wait(until.urlContains("?offer=kapitalfinansavisen"), ttl).catch(()=>console.log("Took too long to connect."));

        el = await getElByClass(driver, ttl, "active");
        expect(await el.getText()).toMatch("Finansavisen + Kapital");
    });

    it("clicks on special offer and if it leads anywhere", async ()=>{
        let parentEl:WebElement = await getElByClass(driver, ttl, "c-subscription-teaser__right-offer");
        await (await parentEl.findElement(By.className("c-button"))).click();
        await driver.wait(until.urlContains("?offer=finansavisen&plan="), ttl).catch(()=>console.log("Took too long to connect."));

        el = await getElByClass(driver, ttl, "active");
        expect(await el.getText()).toMatch(/[\s\S]*/);
    });

    it("clicks on 'Student, eller under 30 ar' offer", async ()=>{
        let parentEl:WebElement = await getElByXPath(driver, ttl, "/html/body/div[1]/div[4]/section/section/div[1]/div[3]/div");
        await (await parentEl.findElement(By.className("c-button"))).click();
        await driver.wait(until.urlContains("under-30"), ttl).catch(()=>console.log("Took too long to connect."));

        el = await getElByClass(driver, ttl, "c-subscription-form__multipublication__products__subscription");
        expect(await el.getText()).toMatch("rabatt til deg under 30");
    }); 

    it("clicks on 'Finansavisen på lørdag + Motor' offer", async ()=>{
        let parentEl:WebElement = await getElByXPath(driver, ttl, "/html/body/div[1]/div[4]/section/section/div[1]/div[4]/div");
        await (await parentEl.findElement(By.className("c-button"))).click();
        await driver.wait(until.urlContains("saturday-motor"), ttl).catch(()=>console.log("Took too long to connect."));

        el = await getElByClass(driver, ttl, "c-subscription-form__multipublication__products");
        expect(await el.getText()).toMatch("Lørdagsabonnement");
    });

    it("clicks on 'Fa 30% rabatt' offer ", async ()=>{
        let parentEl:WebElement = await getElByXPath(driver, ttl, "/html/body/div[1]/div[4]/section/section/div[2]/div[2]/div");
        await (await parentEl.findElement(By.partialLinkText("Få 30% rabatt"))).click();
        await driver.wait(until.urlContains("senior"), ttl).catch(()=>console.log("Took too long to connect."));

        el = await getElByClass(driver, ttl, "c-subscription-form__multipublication__products");
        expect(await el.getText()).toMatch("Pensjonist");
    });

    it("clicks on 'Honnor? Bestill na' offer ", async ()=>{
        let parentEl:WebElement = await getElByXPath(driver, ttl, "/html/body/div[1]/div[4]/section/section/div[2]/div[2]/div");
        await (await parentEl.findElement(By.className("c-button"))).click();
        await driver.wait(until.urlContains("senior"), ttl).catch(()=>console.log("Took too long to connect."));

        el = await getElByClass(driver, ttl, "c-subscription-form__multipublication__products");
        expect(await el.getText()).toMatch("Pensjonist");
    });

    it("check if there are links for fano apps", async ()=>{
        let linkList:WebElement[] = await (await getElByClass(driver, ttl, "c-subscription-deal__download-app")).findElements(By.css("a"));
        expect(linkList.length).toBe(2);
    });
});

it("stops "+browserDriver, ()=>{
    driver.quit();
});