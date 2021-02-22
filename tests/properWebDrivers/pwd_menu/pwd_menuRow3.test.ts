import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver } from "../../../easifier";
import { GetMenuButton } from "../../../helperMenu";

// Starting URL
const rootURL:string = process.env.MENU;
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing links in 3rd row of Menu dropdown list on header
//

// Available WebDrivers
const browserList:string[] = ["firefox", "chrome", "MicrosoftEdge"];
// const browserList:string[] = ["firefox"];


browserList.forEach(browserDriver =>{
    it("waits for "+browserDriver+" to start", async ()=>{
        if(browserDriver!="MicrosoftEdge")
        driver = await buildDriver(browserDriver);
    else
        driver = await buildEdgeDriver();
    });

    describe((browserDriver+" tests").toUpperCase(), ()=>{
        let menuButton:WebElement;

        beforeEach(async ()=>{
            await driver.get(rootURL);

            menuButton = await GetMenuButton(driver, ttl);
            expect(await menuButton.getAttribute("textContent")).toMatch("E-avis");
        });

        if(browserDriver==="firefox")
            afterEach(async ()=>{
                let tabs = await driver.getAllWindowHandles();
                if(tabs.length>1){
                    await driver.switchTo().window(tabs[1]);
                    await driver.close();
                    await driver.switchTo().window(tabs[0]);
                }
            });


        it("checks if 1st link ('KapitalIndeks') leads to Kapital Indeks", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("KapitalIndeks"));
            expect(await el.getAttribute("href")).toMatch("https://kapital.no/kapital-index/norges-400-rikeste");
            await el.click();

            let tabs = await driver.getAllWindowHandles();
            await driver.switchTo().window(tabs[1]);
            await driver.wait(until.elementLocated(By.id("kapital-400-list")));
            expect(await driver.getTitle()).toMatch("Kapitals liste over Norges 400 rikeste | Kapital");
            await driver.close();
            await driver.switchTo().window(tabs[0]);
        });

        it("checks if 2nd link ('VinIndeks') leads to Kapital Vin", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("VinIndeks"));
            expect(await el.getAttribute("href")).toMatch("https://kapital.no/vin");
            await el.click();

            let tabs = await driver.getAllWindowHandles();
            await driver.switchTo().window(tabs[1]);
            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Vin | Kapital");
            await driver.close();
            await driver.switchTo().window(tabs[0]);
        });

        it("checks if 3rd link ('Lunsjguiden') leads to Lunsjguiden", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Lunsjguiden"));
            expect(await el.getAttribute("href")).toMatch("/premium/lunsjguiden");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Lunsjguiden - Premium | Finansavisen");
        });

        it("checks if 4th link ('Biltester') leads to Biltester", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Biltester"));
            expect(await el.getAttribute("href")).toMatch("/motor/biltester");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Biltester - Motor | Finansavisen");
        });

        it("checks if 5th link ('Podcast') leads to Podcast", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Podcast"));
            expect(await el.getAttribute("href")).toMatch("/podcast");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Podcast | Finansavisen");
        });

        it("checks if 6th link ('Event') points to hegnarevents and if 7th link ('Bokklubb') leads to Hegnar Media Bokklubb", async ()=>{
            let el:WebElement = await menuButton.findElement(By.linkText("Event"));
            expect(await el.getAttribute("href")).toMatch("https://www.hegnarevent.no/");

            el = await menuButton.findElement(By.linkText("Bokklubb"));
            expect(await el.getAttribute("href")).toMatch("https://bokklubb.hegnar.no/");
            await el.click();

            let tabs = await driver.getAllWindowHandles();
            await driver.switchTo().window(tabs[1]);
            await driver.wait(until.elementLocated(By.id("maincontent")));
            expect(await driver.getTitle()).toMatch("Hegnar Media Bokklubb");
        });
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});