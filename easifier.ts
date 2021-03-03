import { Builder, By, until, WebDriver, WebElement } from "selenium-webdriver";
const edge = require('selenium-webdriver/edge');

let edgeOptions = new edge.Options();
edgeOptions.setEdgeChromium(true);

export function buildDriver(browser:string){
    try{
        return new Builder().forBrowser(browser).build();
    }
    catch(e){
        console.log(e);
        return null;
    }
}

export function buildEdgeDriver(){
    try{
        return new Builder()
        .setEdgeOptions(edgeOptions)
        .forBrowser('MicrosoftEdge')
        .build();
    }
    catch(e){
        console.log(e);
        return null;
    }
}

// Go to old tab
export async function Next(driver: WebDriver, mainTab: string, browserDriver:string){
    await driver.close();
    await driver.switchTo().window(mainTab);
    FirefoxFix(driver, browserDriver);
    await driver.navigate().refresh();
};

async function FirefoxFix(driver: WebDriver, browserDriver:string = "firefox"){
    // If network or site or computer or whatever lags or takes too long, tab with hang
    // Not just FF issue but it's slowest of proper WebDrivers so was made for it
    if(browserDriver==="firefox"){
        await delay(1000);
    };

    // if(browserDriver==="firefox"){
        let tabs = await driver.getAllWindowHandles();
        if(tabs.length>1){
            await driver.switchTo().window(tabs[1]);
            await driver.close();
            await driver.switchTo().window(tabs[0]);
        };
    // };
};

export async function closeGDPR(driver:WebDriver, ttl:number){
    await (await getElByID(driver, ttl, "finansavisen-gdpr-disclamer-close")).click()
        .catch(()=>{
            console.log("Failed to close GDPR notice.");
            return null;
        });
    return null;
};

export function delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
};




// Get element by
export async function getElByID(driver:WebDriver, ttl:number, id:string){
    const _el:WebElement = await driver.wait(until.elementLocated(By.id(id)), ttl);
    return _el;
};

export async function getElByXPath(driver:WebDriver, ttl:number, xpath:string){
    const _el:WebElement = await driver.wait(until.elementLocated(By.xpath(xpath)), ttl);
    return _el ;
};

export async function getElByPartialLinkText(driver:WebDriver, ttl:number, text:string){
    const _el:WebElement = await driver.wait(until.elementLocated(By.partialLinkText(text)), ttl);
    return _el;
};

export async function getElByClass(driver:WebDriver, ttl:number, text:string){
    const _el:WebElement = await driver.wait(until.elementLocated(By.className(text)), ttl);
    return _el;
};

export async function getElByCss(driver:WebDriver, ttl:number, text:string){
    const _el:WebElement = await driver.wait(until.elementLocated(By.css(text)), ttl);
    return _el;
};

// Get 1st, 2nd, 3rd, 4th... from 1, 2, 3, 4...
export function nOrderStringify(n:number):string{
    if (n%100 === 11 || n%100 === 12 || n%100 === 13) return n+"th";
    switch (n%10){
        case 1: return n+"st";
        case 2: return n+"nd";
        case 3: return n+"rd";
        default: return n+"th";
    }
};