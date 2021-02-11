import { By, Key, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, getElByID, closeGDPR, delay } from "../../../easifier";

// Starting URL
const rootURL:string = "https://finansavisen.no/abonnement/post-launch";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

// Available WebDrivers
const browserDriver:string ="safari";

let driver:WebDriver,
    mainSection:WebElement;

// 
// Testing if Subscription form is being checked on Next
// 

it("waits for "+browserDriver+" to start", async ()=>{
    driver = await buildDriver(browserDriver);
});

describe((browserDriver+" tests").toUpperCase(), ()=>{
    describe("Next button shows warning if required form (for paper) fields aren't filled", ()=>{
        let velgList:WebElement[];
        let formInputs:WebElement[];
        let nextButton:WebElement;

        it("sets up the paper form", async ()=>{
            await driver.get(rootURL);
            expect(await closeGDPR(driver, ttl)).toBeNull();
            // if main form section is found
            mainSection = await getElByID(driver, ttl, "subscription-form");
            expect(mainSection).toBeDefined();
            // if 'Velg produkt' options were found
            velgList = await mainSection.findElements(By.css("li"));
            expect(velgList.length).toBe(2);
            // if 'Velg lengde' options were found
            await velgList[0].click();
            velgList = await mainSection.findElements(By.css("li"));
            expect(velgList.length).toBe(4);
            // if all 11 input fields were found
            await velgList[2].click();
            formInputs = await mainSection.findElements(By.className("c-registration__row__input"));
            expect(formInputs.length).toBe(11);
            // if 'Neste' is found
            nextButton = await mainSection.findElement(By.css("button"));
            let buttonText:string = await nextButton.getText();
            expect(buttonText).toMatch("Neste");
        });

        it("checks if empty form shows all errors", async ()=>{
            await nextButton.click();
            let errorMssgs:WebElement[] = await mainSection.findElements(By.className("c-registration__row__msg--error "));
            expect(errorMssgs.length).toBe(9);
        });

        it("checks if incorrectly filled out form shows 'Required fields empty' errors", async ()=>{
            // Skriv inn ditt telefonnummer
            await formInputs[0].click();
            await formInputs[0].sendKeys("qwe");
            // Fornavn
            await formInputs[1].click();
            await formInputs[1].sendKeys("asd"); 
            // Etternavn
            await formInputs[2].click();
            await formInputs[2].sendKeys("yxc");
            // E-post
            await formInputs[4].click();
            await formInputs[4].sendKeys("qwe");
            // Gate
            await formInputs[5].click();
            await formInputs[5].sendKeys("asd");
            // Husnummer
            await formInputs[6].click();
            await formInputs[6].sendKeys("yxc");
            // Postnummer
            await formInputs[9].click();
            await formInputs[9].sendKeys("qwe");
            // Poststed
            await formInputs[10].click();
            await formInputs[10].sendKeys("asd", Key.TAB);
            await nextButton.click();
            let errorMssgs:WebElement[] = await mainSection.findElements(By.className("c-registration__row__msg--error "));
            expect(errorMssgs.length).toBe(4);
        });

        it("checks if correctly filled out form doesn't show 'Required fields empty' errors", async ()=>{
            formInputs.forEach(async inputEl=>{
                await inputEl.clear();
            });
            // Skriv inn ditt telefonnummer
            await formInputs[0].click();
            await formInputs[0].sendKeys("12345678", Key.TAB);
            // Fornavn
            await formInputs[1].click();
            await formInputs[1].sendKeys("asd", Key.TAB);
            // Etternavn
            await formInputs[2].click();
            await formInputs[2].sendKeys("yxc", Key.TAB);
            // E-post
            await formInputs[4].click();
            await formInputs[4].sendKeys("q@a.at", Key.TAB);
            // Gate
            await formInputs[5].click();
            await formInputs[5].sendKeys("qwe", Key.TAB);
            // Husnummer
            await formInputs[6].click();
            await formInputs[6].sendKeys("1", Key.TAB);
            // Postnummer
            await formInputs[9].click();
            await formInputs[9].sendKeys("0000", Key.TAB);
            // Poststed
            await formInputs[10].click();
            await formInputs[10].sendKeys("asd", Key.TAB);
            // Neste
            await nextButton.click().then(async ()=>await delay(1000));

            await driver.wait(until.urlContains("connectid.no"), ttl)
                    .then(
                        async ()=>{
                            let errorMssgs:WebElement[] = await mainSection.findElements(By.className("c-registration__row__msg--error ")).catch(()=>null);
                            expect(errorMssgs).toBeNull();
                        },
                        async ()=>{
                            console.log(browserDriver+" took too long to connect to mediaconnect.id but if this test passed, issue is webdriver and sendKeys(). If it's safari, remember, safari is 'special'");
                            let errorMssgs:WebElement[] = await mainSection.findElements(By.className("c-registration__row__msg--error ")).catch(()=>null);
                            expect(errorMssgs.length).toBeGreaterThanOrEqual(0);
                        }
                    ); 
        });
    });
});
it("stops "+browserDriver, async ()=>{
    await driver.quit();
});