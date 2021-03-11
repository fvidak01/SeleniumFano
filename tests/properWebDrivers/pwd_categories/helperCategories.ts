import { WebDriver, WebElement, until, By } from "selenium-webdriver";
import { getElByClass, getElByXPath } from "../../../easifier";


export interface ITitleLinkPair{
    title: string,
    link: string
};

export async function GetLinksCount(driver: WebDriver, ttl: number = 15000): Promise<number>{
    const subHeader: WebElement = await getElByClass(driver, ttl, "c-subheader__content");
    const linksCount: number = (await subHeader.findElements(By.css("a"))).length;
    return linksCount;
};

export async function GetSubheaderTitle(driver: WebDriver, ttl: number = 15000): Promise<string>{
    await (await getElByClass(driver, ttl, "c-subheader__title")).click();
    await driver.wait(until.elementLocated(By.className("o-section")), ttl);
    return await driver.getTitle();
};

export async function GetSubcategory(driver: WebDriver, n: number, ttl: number = 15000): Promise<WebElement>{
    const subcategory:WebElement = await getElByXPath(driver, ttl, "//div[@class='c-subheader__content']/div/div["+n+"]/a");
    return subcategory;
};
    
export async function CheckLink(driver: WebDriver, subcategory: WebElement, ttl: number = 15000, isVext3rd: boolean = false): Promise<string>{
    await subcategory.click();

    if(isVext3rd)
        await driver.wait(until.elementLocated(By.className("p6NC9iHpT")), ttl);
    else
        await driver.wait(until.elementLocated(By.className("o-layout")), ttl);
        
    return await driver.getTitle();
};