import { By, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, closeGDPR, getElByID } from "../../../easifier";

// Starting URL
const rootURL:string = "https://finansavisen.no/abonnement/under-30";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

// Available WebDrivers
const browserDriver:string = "safari";

let driver:WebDriver;

// 
// Testing if Under 30 offer loads correct forms
// 

it("waits for "+browserDriver+" to start", async ()=>{
    driver = await buildDriver(browserDriver);
});

describe((browserDriver+" tests").toUpperCase(), ()=>{
    let mainSection:WebElement;
    let optionsList:WebElement[];

    it("sets up the testing area", async ()=>{
        await driver.get(rootURL);
        expect(await closeGDPR(driver, ttl)).toBeNull();
        mainSection = await getElByID(driver, ttl, "subscription-form");
        // if main form section is found
        expect(mainSection).toBeDefined();

        optionsList = await mainSection.findElements(By.css("li"));
        // if 'Velg produkt' option was found
        expect(optionsList.length).toBe(1);

        await optionsList[0].click();
        optionsList = await mainSection.findElements(By.css("li"));
        // if 'Velg lengde' options were found
        expect(optionsList.length).toBe(4);

        await optionsList[1].click();
        optionsList = await mainSection.findElements(By.css("li"));
        // if 'Hva vil du motta hjem?' options were found
        expect(optionsList.length).toBe(7);
    });

    it("checks if 'Månedlig abonnement' options show correct forms", async ()=>{
        // 1/1/1
        let formInputs:WebElement[] = await mainSection.findElements(By.className("c-registration__row__input"));
        expect(formInputs.length).toBe(11);
        // 1/1/3
        await optionsList[6].click();
        formInputs = await mainSection.findElements(By.className("c-registration__row__input"));
        expect(formInputs.length).toBe(4);
        // 1/1/2
        await optionsList[5].click();
        formInputs = await mainSection.findElements(By.className("c-registration__row__input"));
        expect(formInputs.length).toBe(11);
    });

    it("checks if 'Halvårlig abonnement' options show correct forms", async ()=>{
        // 1/2/1
        await optionsList[2].click();
        let formInputs:WebElement[] = await mainSection.findElements(By.className("c-registration__row__input"));
        expect(formInputs.length).toBe(11);
        // 1/2/3
        await optionsList[6].click();
        formInputs = await mainSection.findElements(By.className("c-registration__row__input"));
        expect(formInputs.length).toBe(4);
        // 1/2/2
        await optionsList[5].click();
        formInputs = await mainSection.findElements(By.className("c-registration__row__input"));
        expect(formInputs.length).toBe(11);
    });

    it("checks if 'Årsabonnement' options show correct forms", async ()=>{
        // 1/3/1
        await optionsList[3].click();
        let formInputs:WebElement[] = await mainSection.findElements(By.className("c-registration__row__input"));
        expect(formInputs.length).toBe(11);
        // 1/3/3
        await optionsList[6].click();
        formInputs = await mainSection.findElements(By.className("c-registration__row__input"));
        expect(formInputs.length).toBe(4);
        // 1/3/2
        await optionsList[5].click();
        formInputs = await mainSection.findElements(By.className("c-registration__row__input"));
        expect(formInputs.length).toBe(11);
    });
});

it("stops "+browserDriver, async ()=>{
    await driver.quit();
});