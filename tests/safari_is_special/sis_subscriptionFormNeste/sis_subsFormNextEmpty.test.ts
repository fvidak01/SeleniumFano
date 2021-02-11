import { By, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, getElByID } from "../../../easifier";

// Starting URL
const rootURL:string = "https://finansavisen.no/abonnement/post-launch";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

// Available WebDrivers
const browserDriver:string = "safari";

let driver:WebDriver,
    mainSection:WebElement;

// 
// Testing if Subscription form is being checked on Next
// 

it("waits for "+browserDriver+" to start", async ()=>{
    driver = await buildDriver(browserDriver);
});

describe((browserDriver+" tests").toUpperCase(), ()=>{
    describe("Next button disabled before input form loads", ()=>{
        let velgProduktList:WebElement[];
        let el:WebElement;
        let actual:any;

        it("sets up the page", async ()=>{
            await driver.get(rootURL);
            mainSection = await getElByID(driver, ttl, "subscription-form");
            // if form section is found
            expect(mainSection).toBeDefined();
            velgProduktList = await mainSection.findElements(By.css("li"));
            // if 'Velg produkt' options are found
            expect(velgProduktList.length).toBe(2);
        });

        it("checks if Next button is disabled when nothing selected in 'Velg produkt'", async ()=>{
            el = await mainSection.findElement(By.css("button"));
            actual = await el.isEnabled();
            expect(actual).toBeFalsy();
        });

        it("checks if Next button is disabled if nothing is selected in 'Velg lengde' when only 'Finansavisen' is choosen", async ()=>{
            await velgProduktList[0].click();
            el = await mainSection.findElement(By.css("button"));
            actual = await el.isEnabled();
            expect(actual).toBeFalsy();
        });

        it("checks if Next button is disabled if nothing is selected in 'Velg lengde' when 'Finansavisen + Kapital' are choosen", async ()=>{
            await velgProduktList[1].click();
            el = await mainSection.findElement(By.css("button"));
            actual = await el.isEnabled();
            expect(actual).toBeFalsy();
        });   
    });
});
it("stops "+browserDriver, async ()=>{
    await driver.quit();
});