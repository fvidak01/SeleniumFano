import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, closeGDPR } from "../../../easifier";

// Starting URL
const rootURL: string =  process.env.AGENDA_FRONTPAGE;
// in ms
const ttl: number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

//
// Testing the count of agenda articles on frontpage
//

// Available WebDrivers
const browserList: string[] = ["MicrosoftEdge", "firefox", "chrome"];
// const browserList:string[] = ["firefox"];


browserList.forEach(browserDriver =>{
    describe((browserDriver+" tests").toUpperCase(), ()=>{
        let driver: WebDriver;
    
        it("sets up the testing area", async ()=>{
            if(browserDriver !== "MicrosoftEdge")
                driver = await buildDriver(browserDriver);
            else
                driver = await buildEdgeDriver();
            expect(driver).not.toBeNull();

            await driver.get(rootURL);
            expect(await closeGDPR(driver, ttl)).toBeNull();
        });

        const topAgendaID: string = "frontpage-top";
        it("checks how many agenda articles are in " + topAgendaID + " section on frontpage", async ()=>{
            const receivedAgendaCount: number = await CheckAgendaSection(driver, topAgendaID)
            expect(receivedAgendaCount).toBe(4);
        });

        const middleAgendaID: string = "frontpage-middle";
        it("checks how many agenda articles are in "+middleAgendaID+" section on frontpage", async ()=>{
            const receivedAgendaCount: number = await CheckAgendaSection(driver, middleAgendaID)
            expect(receivedAgendaCount).toBe(2);
        });

        const bottomAgendaID: string = "frontpage-bottom";
        it("checks how many agenda articles are in "+bottomAgendaID+" section on frontpage", async ()=>{
            const receivedAgendaCount: number = await CheckAgendaSection(driver, bottomAgendaID)
            expect(receivedAgendaCount).toBe(2);
        });
    
        it("stops "+browserDriver, async ()=>{
            await driver.quit();
        });
    });
});

async function CheckAgendaSection(driver: WebDriver, sectionID: string): Promise<number>{
    const section: WebElement = await driver.wait(until.elementLocated(By.id(sectionID)), ttl);
    return (await section.findElements(By.css("article"))).length;
};