import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, getElByXPath } from "../../../easifier";

// Starting URL
const rootURL:string = process.env.HEADER || "https://finansavisen.no";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing header Nyheter dropdown list
//

// Available WebDrivers
const browserList:string[] = ["chrome", "firefox", "MicrosoftEdge"];
// const browserList:string[] = ["chrome"];


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
        });

        it("checks if 1st item ('Siste 24 timer') opens correct category", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[2]")
            expect(await category.getAttribute("textContent")).toMatch("Nyheter");
            await driver.actions({bridge: true}).move({duration:100, origin:category, x:0, y:0}).perform();
            
            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let el:WebElement = await category.findElement(By.linkText("Siste 24 timer"));
            expect(await el.getAttribute("href")).toMatch("/nyheter");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Nyheter | Finansavisen");
        });

        it("checks if 2nd item ('Nyheter') opens correct category", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[2]")
            expect(await category.getAttribute("textContent")).toMatch("Nyheter");
            await driver.actions({bridge: true}).move({duration:100, origin:category, x:0, y:0}).perform();

            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let el:WebElement = await category.findElement(By.linkText("Alle pluss-artikler"));
            expect(await el.getAttribute("href")).toMatch("/fa");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Fa+ | Finansavisen");
        });

        it("checks if 3rd item ('Leder') opens correct category", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[2]")
            expect(await category.getAttribute("textContent")).toMatch("Nyheter");
            await driver.actions({bridge: true}).move({duration:100, origin:category, x:0, y:0}).perform();

            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let el:WebElement = await category.findElement(By.linkText("Leder"));
            expect(await el.getAttribute("href")).toMatch("/leder");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Leder | Finansavisen");
        });

        it("checks if 4th item ('Bolig') opens correct category", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[2]")
            expect(await category.getAttribute("textContent")).toMatch("Nyheter");
            await driver.actions({bridge: true}).move({duration:100, origin:category, x:0, y:0}).perform();

            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let el:WebElement = await category.findElement(By.linkText("Bolig"));
            expect(await el.getAttribute("href")).toMatch("/bolig");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Bolig - Nyheter | Finansavisen");
        });

        it("checks if 5th item ('Børs') opens correct category", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[2]")
            expect(await category.getAttribute("textContent")).toMatch("Nyheter");
            await driver.actions({bridge: true}).move({duration:100, origin:category, x:0, y:0}).perform();

            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let el:WebElement = await category.findElement(By.linkText("Børs"));
            expect(await el.getAttribute("href")).toMatch("/borsdognet");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Børs - Nyheter | Finansavisen");
        });

        it("checks if 6th item ('Energi') opens correct category", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[2]")
            expect(await category.getAttribute("textContent")).toMatch("Nyheter");
            await driver.actions({bridge: true}).move({duration:100, origin:category, x:0, y:0}).perform();

            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let el:WebElement = await category.findElement(By.linkText("Energi"));
            expect(await el.getAttribute("href")).toMatch("/energi");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Energi - Nyheter | Finansavisen");
        });

        it("checks if 7th item ('Finans') opens correct category", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[2]")
            expect(await category.getAttribute("textContent")).toMatch("Nyheter");
            await driver.actions({bridge: true}).move({duration:100, origin:category, x:0, y:0}).perform();

            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let el:WebElement = await category.findElement(By.linkText("Finans"));
            expect(await el.getAttribute("href")).toMatch("/finans");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Finans - Nyheter | Finansavisen");
        });

        it("checks if 8th item ('Personlig økonomi') opens correct category", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[2]")
            expect(await category.getAttribute("textContent")).toMatch("Nyheter");
            await driver.actions({bridge: true}).move({duration:100, origin:category, x:0, y:0}).perform();

            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let el:WebElement = await category.findElement(By.linkText("Personlig økonomi"));
            expect(await el.getAttribute("href")).toMatch("/personlig-okonomi");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Personlig økonomi - Nyheter | Finansavisen");
        });

        it("checks if 9th item ('Shipping') opens correct category", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[2]")
            expect(await category.getAttribute("textContent")).toMatch("Nyheter");
            await driver.actions({bridge: true}).move({duration:100, origin:category, x:0, y:0}).perform();

            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let el:WebElement = await category.findElement(By.linkText("Shipping"));
            expect(await el.getAttribute("href")).toMatch("/shipping");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Shipping - Nyheter | Finansavisen");
        });

        it("checks if 10th item ('Sjømat') opens correct category", async ()=>{
            let category:WebElement = await getElByXPath(driver, ttl, "//ul[@class='c-header-bar-nav__list']/li[2]")
            expect(await category.getAttribute("textContent")).toMatch("Nyheter");
            await driver.actions({bridge: true}).move({duration:100, origin:category, x:0, y:0}).perform();

            await driver.wait(until.elementLocated(By.className("c-header-bar-nav__small-menu__content")));
            let el:WebElement = await category.findElement(By.linkText("Sjømat"));
            expect(await el.getAttribute("href")).toMatch("/sjomat");
            await el.click();

            await driver.wait(until.elementLocated(By.className("o-section")));
            expect(await driver.getTitle()).toMatch("Sjømat - Nyheter | Finansavisen");
        });
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});