import { By, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, closeGDPR, getElByID } from "../../../easifier";

// Starting URL
const rootURL:string = process.env.SUB_PLANS_FANO || "https://finansavisen.no/abonnement/post-launch?offer=finansavisen";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

// Available WebDrivers
const browserDriver:string = "safari";

let driver:WebDriver,
    mainSection:WebElement;

// 
// Testing if Finansavisen only forms work properly
// 

it("waits for "+browserDriver+" to start", async ()=>{
    driver = await buildDriver(browserDriver);
});

describe((browserDriver+" tests").toUpperCase(), ()=>{
    let optionsList:WebElement[];

    it("sets up testing area", async ()=>{
        await driver.get(rootURL);
        expect(await closeGDPR(driver, ttl)).toBeNull();
        mainSection = await getElByID(driver, ttl, "subscription-form");
        // if main section is found
        expect(mainSection).toBeDefined();

        optionsList = await mainSection.findElements(By.css("li"));
        // if 'Velg produkt' and 'Velg lengde' options were found
        expect(optionsList.length).toBe(4);

        await optionsList[2].click();
        optionsList = await mainSection.findElements(By.css("li"));
        // if 'Hva vil du motta hjem?' options are found
        expect(optionsList.length).toBe(7);
    });

    it("checks if 'Månedlig abonnement' options show correct forms", async ()=>{
        // 1/1/1
        let formRows:WebElement[] = await mainSection.findElements(By.className("c-registration__row"));
        expect(formRows.length).toBe(11);
        // 1/1/3
        await optionsList[6].click();
        formRows = await mainSection.findElements(By.className("c-registration__row"));
        expect(formRows.length).toBe(4);
        // 1/1/2
        await optionsList[5].click()
        formRows = await mainSection.findElements(By.className("c-registration__row"));
        expect(formRows.length).toBe(11);
    });

    it("checks if 'Arsabonnement' options show correct forms", async ()=>{
        // 1/2/1
        await optionsList[3].click();
        let formRows:WebElement[] = await mainSection.findElements(By.className("c-registration__row"));
        expect(formRows.length).toBe(11);
        // 1/2/3
        await optionsList[6].click();
        formRows = await mainSection.findElements(By.className("c-registration__row"));
        expect(formRows.length).toBe(4);
        // 1/2/2
        await optionsList[5].click();
        formRows = await mainSection.findElements(By.className("c-registration__row"));
        expect(formRows.length).toBe(11);
    });
});

it("stops "+browserDriver, async ()=>{
    await driver.quit();
});