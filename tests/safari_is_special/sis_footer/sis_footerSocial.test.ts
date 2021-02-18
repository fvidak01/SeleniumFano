import { By, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, closeGDPR, getElByCss } from "../../../easifier";

// Starting URL
const rootURL:string = process.env.FOOTER || "https://finansavisen.no/";
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing if social media links in footer are all there
//

// Available WebDrivers
const browserDriver:string = "safari";


it("waits for "+browserDriver+" to start", async ()=>{
    driver = await buildDriver(browserDriver);
});

describe((browserDriver+" tests").toUpperCase(), ()=>{
    let socialLinks:WebElement[];

    it("sets up the testing area", async ()=>{
        await driver.get(rootURL);
        expect(await closeGDPR(driver, ttl)).toBeNull();
    });

    it("checks if all 4 social media links are there", async ()=>{
        let footer:WebElement = await getElByCss(driver, ttl, "footer");
        socialLinks = await footer.findElements(By.className("c-btn-socialmedia--icon"));
        expect(socialLinks.length).toBe(4);
    });

    it("checks if all social media links have proper url", async ()=>{
        let expectedHrefs:string[] = [
            "https://www.twitter.com/Finansavisen",
            "https://www.facebook.com/Finansavisen",
            "https://www.instagram.com/finansavisen",
            "https://www.linkedin.com/company/finansavisen"
        ]
        for (let i=0; i<4; i++){
            expect(await socialLinks[i].getAttribute("href")).toMatch(expectedHrefs[i]);
        }
    });
});

it("stops "+browserDriver, async ()=>{
    await driver.quit();
});