import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, closeGDPR, delay, getElByXPath } from "../../../easifier";

// Starting URL
const rootURL:string = "https://finansavisen.no";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing header Menu dropdown list for number of links
//

// Available WebDrivers
const browserList:string[] = ["chrome", "MicrosoftEdge", "firefox"];
// const browserList:string[] = ["chrome"];


browserList.forEach(browserDriver =>{
    it("waits for "+browserDriver+" to start", async ()=>{
        if(browserDriver!="MicrosoftEdge")
        driver = await buildDriver(browserDriver);
    else
        driver = await buildEdgeDriver();
    });

    describe((browserDriver+" tests").toUpperCase(), ()=>{
        let menuButton:WebElement;
        let rows = new Array<WebElement>(4);
        let elements = new Array<WebElement[]>(4);
        let subCategories = new Array<WebElement[]>(6);

        it("sets up the testing area", async ()=>{
            await driver.get(rootURL);

            menuButton = await getElByXPath(driver, ttl, "//div[@class='c-header-bar__toggle-menu']")
            expect(await menuButton.getAttribute("textContent")).toMatch("E-avis");
            await driver.actions({bridge: true}).move({duration:100, origin:menuButton, x:0, y:0}).perform();

            await driver.wait(until.elementIsVisible(menuButton.findElement(By.id("menu-content"))));
            rows[0] = await menuButton.findElement(By.className("c-navigation-menu__links"));
            rows[1] = await menuButton.findElement(By.className("c-navigation-categories"));
            rows[2] = await menuButton.findElement(By.xpath("//div[@id='menu-content']/div[2]"));
            rows[3] = await menuButton.findElement(By.xpath("//div[@id='menu-content']/div[3]"));

            elements[0] = await rows[0].findElements(By.className("c-navigation-menu__link"));
            elements[1] = await rows[1].findElements(By.className("c-navigation-categories__section"));
            elements[2] = await rows[2].findElements(By.className("c-navigation-menu__link--button"));
            elements[3] = await rows[3].findElements(By.xpath(".//*"));

            for(let i=0; i<5; i++){
                subCategories[i] = await elements[1][i].findElements(By.className("c-navigation-categories__subcategories__item"));
            }
            subCategories[5] = await elements[1][6].findElements(By.className("c-navigation-categories__subcategories__item"));
        });

        it("checks if 1st row has 4 items", async ()=>{
            expect(elements[0].length).toBe(4);
        });
        it("checks if 2nd row has 6 (7 counting one mobile-only) categories", async ()=>{
            expect(elements[1].length).toBe(7);
        });
        it("checks if 3rd row has 7 buttons", async ()=>{
            expect(elements[2].length).toBe(7);
        });
        it("checks if 4th row has search form and a button", async ()=>{
            expect(elements[3].length).toBe(6);
        });

        it("checks if 1st category ('Nyheter') has 34 subcategories", async ()=>{
            expect(subCategories[0].length).toBe(68);
        });
        it("checks if 2nd category ('Motor') has 7 subcategories", async ()=>{
            expect(subCategories[1].length).toBe(14);
        });
        it("checks if 3rd category ('Premium') has 10 subcategories", async ()=>{
            expect(subCategories[2].length).toBe(20);
        });
        it("checks if 4th category ('Vext') has 3 subcategories", async ()=>{
            expect(subCategories[3].length).toBe(6);
        });
        it("checks if 5th category ('Lørdag') has 5 subcategories", async ()=>{
            expect(subCategories[4].length).toBe(10);
        });
        it("checks if 6th category ('Kapital' is 7th on mobile) has 9 subcategories", async ()=>{
            expect(subCategories[5].length).toBe(18);
        });
        it("checks if menu gets closed on click", async ()=>{
            await menuButton.click();
            await driver.wait(until.elementIsNotVisible(menuButton.findElement(By.id("menu-content"))));
        });
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});