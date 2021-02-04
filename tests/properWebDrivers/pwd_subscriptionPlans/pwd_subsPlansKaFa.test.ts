import { By, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, closeGDPR, getElByID } from "../../../easifier";

// Starting URL
const rootURL:string = 
    "https://finansavisen.no/abonnement/post-launch?offer=kapitalfinansavisen";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

// Available WebDrivers
const browserList:string[] = ["firefox", "chrome", "MicrosoftEdge"];
// const browserList:string[] = ["chrome"];

let driver:WebDriver,
    mainSection:WebElement;

// 
// Testing if Finansavisen + Kapital forms work properly
// 

browserList.forEach(browserDriver =>{
    it("waits for "+browserDriver+" to start", async ()=>{
        if(browserDriver!="MicrosoftEdge")
        driver = await buildDriver(browserDriver);
    else
        driver = await buildEdgeDriver();
    });

    describe((browserDriver+" tests").toUpperCase(), ()=>{
        let optionsList:WebElement[];
    
        it("sets up testing area", async ()=>{
            await driver.get(rootURL);
            await closeGDPR(driver, ttl);
            mainSection = await getElByID(driver, ttl, "subscription-form");
            // if main section is found
            expect(mainSection).toBeDefined();
    
            optionsList = await mainSection.findElements(By.css("li"));
            // if 'Velg produkt' and 'Velg lengde' options were found
            expect(optionsList.length).toBe(4);
    
            await optionsList[2].click();
            optionsList = await mainSection.findElements(By.css("li"));
            // if 'Hva vil du motta hjem?' options are found
            expect(optionsList.length).toBe(9);
        });
    
        it("checks if 'Manedlig abonnement' options show correct forms", async ()=>{
            let formRows:WebElement[];
            // 1/1/1/1
            formRows = await mainSection.findElements(By.className("c-registration__row"));
            expect(formRows.length).toBe(11);
            // 1/1/1/2
            await optionsList[8].click();
            formRows = await mainSection.findElements(By.className("c-registration__row"));
            expect(formRows.length).toBe(11);
            // 1/1/2/2
            await optionsList[5].click();
            formRows = await mainSection.findElements(By.className("c-registration__row"));
            expect(formRows.length).toBe(11);
            // 1/1/2/1
            await optionsList[7].click();
            formRows = await mainSection.findElements(By.className("c-registration__row"));
            expect(formRows.length).toBe(11);
            // 1/1/3/1
            await optionsList[6].click();
            formRows = await mainSection.findElements(By.className("c-registration__row"));
            expect(formRows.length).toBe(11);
            // 1/1/3/2
            await optionsList[8].click();
            formRows = await mainSection.findElements(By.className("c-registration__row"));
            expect(formRows.length).toBe(4);
        });
    
        it("checks if 'Arsabonnement' options show correct forms", async ()=>{
            let formRows:WebElement[];
            // 1/2/1/1
            await optionsList[3].click();
            formRows = await mainSection.findElements(By.className("c-registration__row"));
            expect(formRows.length).toBe(11);
            // 1/2/1/2
            await optionsList[8].click();
            formRows = await mainSection.findElements(By.className("c-registration__row"));
            expect(formRows.length).toBe(11);
            // 1/2/2/2
            await optionsList[5].click();
            formRows = await mainSection.findElements(By.className("c-registration__row"));
            expect(formRows.length).toBe(11);
            // 1/2/2/1
            await optionsList[7].click();
            formRows = await mainSection.findElements(By.className("c-registration__row"));
            expect(formRows.length).toBe(11);
            // 1/2/3/1
            await optionsList[6].click();
            formRows = await mainSection.findElements(By.className("c-registration__row"));
            expect(formRows.length).toBe(11);
            // 1/2/3/2
            await optionsList[8].click();
            formRows = await mainSection.findElements(By.className("c-registration__row"));
            expect(formRows.length).toBe(4);
        });
    });
    
    it("stops "+browserDriver, ()=>{
        driver.quit();
    });
});