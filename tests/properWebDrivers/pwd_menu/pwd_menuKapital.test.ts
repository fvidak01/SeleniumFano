import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, nOrderStringify } from "../../../easifier";
import { GetMenuButton } from "../../../helperMenu";

// Starting URL
const rootURL:string = process.env.MENU;
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing Kapital subcategory links in header
//

// Available WebDrivers
const browserList:string[] = ["MicrosoftEdge", "chrome", "firefox"];
// const browserList:string[] = ["firefox"];


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
        
        CheckLinkByXPath(1, "Reportasjer", true, "", "Kapital | kapital.no");
        CheckLinkByText(2, "Portrett");
        CheckLinkByText(3, "Inside");
        CheckLinkByText(4, "Karriere");
        CheckLinkByXPath(5, "Tech");
        CheckLinkByText(6, "Investor");
        CheckLinkByXPath(7, "Vin");
        CheckLinkByText(8, "Reise");
        CheckLinkByText(9, "KapiTalt-bloggen", false, "blogg", "KapiTalt");
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});


async function CheckLinkByXPath(
    n:number, 
    item:string,
    refreshAfter:boolean = true,
    link:string = item.toLowerCase(), 
    title:string = item+" | Kapital"
    ){
        it("checks if "+nOrderStringify(n)+" link (\'"+item+"\') leads to Kapital "+item, async ()=>{
            let menuButton:WebElement = await GetMenuButton(driver, ttl);
            expect(await menuButton.getAttribute("textContent")).toMatch("E-avis");

            let el:WebElement = await menuButton.findElement(By.xpath(".//nav/div[7]/div/div/div["+n+"]/a"));
            let mainTab:string = await GoToPage(el, link);

            expect(await driver.getTitle()).toMatch(title);
            await Next(refreshAfter, mainTab);
        });
};

async function CheckLinkByText(
    n:number, 
    item:string,
    refreshAfter:boolean = true,
    link:string = item.toLowerCase(), 
    title:string = item
    ){
        it("checks if "+nOrderStringify(n)+" link (\'"+item+"\') leads to Kapital "+title, async ()=>{
            let menuButton:WebElement = await GetMenuButton(driver, ttl);
            expect(await menuButton.getAttribute("textContent")).toMatch("E-avis");

            let el:WebElement = await menuButton.findElement(By.linkText(item));
            let mainTab:string = await GoToPage(el, link);

            expect(await driver.getTitle()).toMatch(title+" | Kapital");
            await Next(refreshAfter, mainTab);
        });
};



async function GoToPage(el:WebElement, link:string):Promise<string>{
    expect(await el.getAttribute("href")).toMatch("kapital.no/"+link);
    await el.click();

    let tabs = await driver.getAllWindowHandles();
    await driver.switchTo().window(tabs[1]);
    await driver.wait(until.elementLocated(By.className("o-section")));

    return tabs[0];
};

async function Next(refreshAfter:boolean, mainTab:string){
    await driver.close();
    await driver.switchTo().window(mainTab);

    if(refreshAfter){
        let tabs = await driver.getAllWindowHandles();
        if(tabs.length>1){
            await driver.switchTo().window(tabs[1]);
            await driver.close();
            await driver.switchTo().window(tabs[0]);
        }
        await driver.navigate().refresh();
    };
};