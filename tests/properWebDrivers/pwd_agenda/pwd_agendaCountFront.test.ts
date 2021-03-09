import { By, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, closeGDPR, getElByID } from "../../../easifier";

// Starting URL
const rootURL:string =  process.env.AGENDA_FRONTPAGE;
// in ms
const ttl:number = 15000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

let driver:WebDriver;

//
// Testing the count of agenda articles on frontpage
//

// Available WebDrivers
const browserList:string[] = ["MicrosoftEdge", "firefox", "chrome"];
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
            expect(await closeGDPR(driver, ttl)).toBeNull();
        });

        CheckAgendaSection("frontpage-top", 4);
        CheckAgendaSection("frontpage-middle", 2);
        CheckAgendaSection("frontpage-bottom", 2);
    });
    
    it("stops "+browserDriver, async ()=>{
        await driver.quit();
    });
});

function CheckAgendaSection(sectionID: string, expectedArticleCount: number){
    it("checks how many agenda articles are in "+sectionID+" section on frontpage", async ()=>{
        let section: WebElement = await getElByID(driver, ttl, sectionID);
        let actualArticleCount: number = (await section.findElements(By.css("article"))).length;
        expect(actualArticleCount).toBe(expectedArticleCount);
    })
};