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

export async function closeGDPR(driver:WebDriver, ttl:number){
    await (await getElByID(driver, ttl, "finansavisen-gdpr-disclamer-close")).click()
        .catch(()=>{
            console.log("Failed to close GDPR notice.");
            return null;
        });
};

export function delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export function safariDelay(browser:string, ms:number){
    if(browser==="safari"){
        return new Promise(resolve => setTimeout(resolve, ms));
    };
    return;
};

// Get element by
export async function getElByID(driver:WebDriver, ttl:number, id:string){
    const _el:WebElement = await driver.wait(until.elementLocated(By.id(id)), ttl);
    return _el;
}

export async function getElByXPath(driver:WebDriver, ttl:number, xpath:string){
    const _el:WebElement = await driver.wait(until.elementLocated(By.xpath(xpath)), ttl);
    return _el ;
}

export async function getElByPartialLinkText(driver:WebDriver, ttl:number, text:string){
    const _el:WebElement = await driver.wait(until.elementLocated(By.partialLinkText(text)), ttl);
    return _el;
}

export async function getElByClass(driver:WebDriver, ttl:number, text:string){
    const _el:WebElement = await driver.wait(until.elementLocated(By.className(text)), ttl);
    return _el;
}

