import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, closeGDPR, delay, nOrderStringify } from "../../../easifier";

// All Subcategories have same basic template so this work for all (sve) of them
export function Sve(rootURL:string){

    // in ms
    const ttl:number = 15000;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

    //
    // Testing subcategories' articles for 404
    //

    // Available WebDrivers
    const browserList:string[] = ["MicrosoftEdge", "firefox", "chrome"];
    // const browserList:string[] = ["chrome"];


    browserList.forEach(browserDriver =>{
        let driver:WebDriver;

        describe((browserDriver+" tests").toUpperCase(), ()=>{
            it("sets up the testing area", async ()=>{
                if(browserDriver !== "MicrosoftEdge")
                    driver = await buildDriver(browserDriver);
                else
                    driver = await buildEdgeDriver();
                expect(driver).not.toBeNull();

                await driver.get(rootURL);
                expect(await closeGDPR(driver, ttl)).toBeNull();
            });

            // Motor Design og Teknikk has 1 article (2021/3/11)
            if(rootURL !== process.env.MOTOR_DESIGNOGTEKNIKK){
                for(let i = 0; i < 3; i++)
                    (async ()=>{
                        await CheckSection(i, "Top3");
                    })();
                // Premium Kunst has only 3 articles (2021/3/11)
                if (rootURL !== process.env.PREMIUM_KUNST){
                    // Vext Tech has only 3+2 articles (2021/3/11)
                    if (rootURL === process.env.VEXT_TECH){
                        for(let i = 0; i < 2; i++)
                            (async ()=>{
                                await CheckSection(i, "Mid6");
                            })();
                    }
                    // Subcategories with more than 3+6+3 articles
                    else {
                        for(let i = 0; i < 6; i++)
                            (async ()=>{
                                await CheckSection(i, "Mid6");
                            })();

                        for(let i = 0; i < 4; i++)
                            (async ()=>{
                                await CheckSection(i, "Bot4");
                            })();
                    };
                };
            }
            // Motor Design og Teknikk has 1 article (2021/3/11)
            else{
                for(let i = 0; i < 1; i++)
                    (async ()=>{
                        await CheckSection(i, "Top3");
                    })();
            };
            // 
            // Agenda count checks
            // 
            (async ()=>{
                await CheckAgendaNumbers("top");
            })();

            // Nyheter Leder has no bottom agenda
            if (rootURL !== process.env.NYHETER_LEDER)
                (async ()=>{
                    await CheckAgendaNumbers("bottom");
                })();
        
            it("stops "+browserDriver, async ()=>{
                await driver.quit();
            });
        });


        async function CheckSection(n: number, sect: string){
            let classIdentifier: string;
            let expected: number;
            let tag: string;
            switch (sect){
                case "Top3": 
                    classIdentifier = "c-category__featured";
                    // Motor Design og Teknikk has 1 article (2021/3/11)
                    if(rootURL === process.env.MOTOR_DESIGNOGTEKNIKK)
                        expected = 1;
                    else
                        expected = 3;
                    tag = "article";
                    break;
                case "Mid6":
                    classIdentifier = "js-strossle-widget";
                    // Vext Tech has only 3+2 articles (2021/3/11)
                    if(rootURL === process.env.VEXT_TECH)
                        expected = 2;
                    else
                        expected = 6;
                    tag = "article";
                    break;
                // Not gonna test all in that section, just 1st 4
                case "Bot4":
                    classIdentifier = "u-x1of1 u-x2of3-medium";
                    // Motor Gadgets has only 3+6+4 articles (2021/3/11)
                    if(rootURL === process.env.MOTOR_GADGETS)
                        expected = 4;
                    else
                        expected = 11;
                    tag = "a";
                    break;
            };
            it("checks "+nOrderStringify(n+1)+" article in "+sect+" section", async ()=>{
                // Firefox doesn't load all articles by the time it checks array length so some tests randomly fail
                // Chrome and Edge close WebDriver and crash all tests after Top3, seems to work now, .back() was messing them up
                if((await driver.getCapabilities()).getBrowserName() === "firefox")
                    await delay(500);
        
                let section:WebElement = await driver.wait(until.elementLocated(By.className(classIdentifier)), ttl);
                let articles:WebElement[] = await section.findElements(By.css(tag));
                // Check only 1st time if it has expected number of articles, tests are fonky af if checked every time
                if(n === 0)
                    expect(articles.length).toBe(expected);
                await articles[n].click();
                await Check404AndGoBack();
            });
        };
        
        
        async function CheckAgendaNumbers(position: string){
            let positionID: string;
            let expected: number;
            switch (position){
                case "top": 
                    positionID = "category-top";
                    expected = 4;
                    break;
                case "bottom":
                    positionID = "category-bottom";
                    expected = 2;
                    break;
            };
            it("checks number of articles in "+position+" agenda", async ()=>{
                // Firefox doesn't load all articles by the time it checks array length so some tests randomly fail
                // Chrome and Edge close WebDriver and crash all tests after Top3, seems to work now, .back() was messing them up but they need to wait now
                // if((await driver.getCapabilities()).getBrowserName() === "firefox")
                    await delay(500);
        
                let section:WebElement = await driver.wait(until.elementLocated(By.id(positionID)), ttl);
                let articles:WebElement[] = await section.findElements(By.css("article"));
                expect(articles.length).toBe(expected);
            });
        };
        
        
        async function Check404AndGoBack(){
            // await driver.wait(until.elementLocated(By.className("lazyautosizes lazyloaded")), ttl);
            await driver.wait(until.elementLocated(By.css("h1")), ttl);
            expect(await driver.getTitle()).not.toMatch(/404: Not Found/);
        
            // Chromium WebDrivers sometimes double-back and go back to ;data which is before rootURL
            // await driver.navigate().back();
        
            await driver.get(rootURL);
            await driver.wait(until.elementLocated(By.id("category-top")), ttl, "Waiting page to load")
        };
    });
};
