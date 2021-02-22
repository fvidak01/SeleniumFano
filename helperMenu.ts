import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { getElByXPath } from "./easifier";

export async function GetMenuButton(driver:WebDriver, ttl:number):Promise<WebElement>{
    let menuButton:WebElement = await getElByXPath(driver, ttl, "//div[@class='c-header-bar__toggle-menu']")
    
    await driver
        .actions({bridge: true})
        .move({duration:100, origin:menuButton, x:0, y:0})
        .perform();
    await driver.wait(until.elementIsVisible(menuButton.findElement(By.id("menu-content"))));

    return menuButton;
};