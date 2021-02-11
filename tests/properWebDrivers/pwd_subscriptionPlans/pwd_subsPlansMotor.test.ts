import { By, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, closeGDPR, getElByID } from "../../../easifier";

// Starting URL
const rootURL:string = "https://finansavisen.no/abonnement/saturday-motor";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

// Available WebDrivers
const browserList:string[] = ["MicrosoftEdge", "chrome", "firefox",];
// const browserList:string[] = ["chrome"];

let driver:WebDriver;

// 
// Testing if 'Saturday Motor' offer loads correct forms
// 

browserList.forEach(browserDriver =>{
    it("waits for "+browserDriver+" to start", async ()=>{
        if(browserDriver!="MicrosoftEdge")
        driver = await buildDriver(browserDriver);
    else
        driver = await buildEdgeDriver();
    });

    describe((browserDriver+" tests").toUpperCase(), ()=>{
        let mainSection:WebElement;
        let velgList:WebElement[];

        it("sets up the testing area", async ()=>{
            await driver.get(rootURL);
            expect(await closeGDPR(driver, ttl)).toBeNull();
            mainSection = await getElByID(driver, ttl, "subscription-form");
            // if main form section is found
            expect(mainSection).toBeDefined();

            velgList = await mainSection.findElements(By.css("li"));
            // if 'Velg produkt' option was found
            expect(velgList.length).toBe(1);

            await velgList[0].click();
            velgList = await mainSection.findElements(By.css("li"));
            // if 'Velg lengde' options were found
            expect(velgList.length).toBe(3);
        });

        it("checks if 'Halvårlig abonnement' option shows correct form", async ()=>{
            // 1/1/1
            await velgList[1].click();
            let formInputs:WebElement[] = await mainSection.findElements(By.className("c-registration__row__input"));
            expect(formInputs.length).toBe(11);
        });

        it("checks if 'Årsabonnement' options show correct forms", async ()=>{
            // 1/2/1
            await velgList[2].click();
            let formInputs:WebElement[] = await mainSection.findElements(By.className("c-registration__row__input"));
            expect(formInputs.length).toBe(11);
        });
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});