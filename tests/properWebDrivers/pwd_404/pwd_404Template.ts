import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { buildDriver, buildEdgeDriver, closeGDPR, delay, getElByClass, getElByID, nOrderStringify } from "../../../easifier";


export function Sve(rootURL:string){
    // Starting URL
    // const rootURL:string = process.env.MOTOR_NYHETER;
    // in ms
    const ttl:number = 15000;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

    let driver:WebDriver;

    //
    // Testing subcategories' articles for 404
    //

    // Available WebDrivers
    const browserList:string[] = ["MicrosoftEdge", "firefox", "chrome"];
    // const browserList:string[] = ["chrome"];


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

            for(let i = 0; i < 3; i++)
                (async ()=>{
                    await CheckSection(i, "Top3");
                })();

            // Premium Kunst has only 3 articles (2021/4/3)
            if (rootURL != process.env.PREMIUM_KUNST){
                for(let i = 0; i < 6; i++)
                    (async ()=>{
                        await CheckSection(i, "Mid6");
                    })();

                for(let i = 0; i < 4; i++)
                    (async ()=>{
                        await CheckSection(i, "Bot4");
                    })();
            };
            
            (async ()=>{
                await CheckAgendaNumbers("top");
            })();
            (async ()=>{
                await CheckAgendaNumbers("bottom");
            })();
        });
        
        it("stops "+browserDriver, async ()=>{
            await driver.quit();
        });
    });


    async function CheckSection(n:number, sect:string){
        let classIdentifier:string;
        let expected:number;
        let tag:string;
        switch (sect){
            case "Top3": 
                classIdentifier = "c-category__featured";
                expected = 3;
                tag = "article";
                break;
            case "Mid6":
                classIdentifier = "js-strossle-widget";
                expected = 6;
                tag = "article";
                break;
            // Not gonna test all in that section, just 1st 4
            case "Bot4":
                classIdentifier = "u-x1of1 u-x2of3-medium";
                // Motor Gadgets has only 3+6+4 articles (2021/3/4)
                if(rootURL === process.env.MOTOR_GADGETS)
                    expected = 4;
                else
                    expected = 11;
                tag = "a";
                break;
        };

        it("checks "+nOrderStringify(n+1)+" article in "+sect+" section", async ()=>{
            // Firefox doesn't load all articles by the time it checks array length so some tests randomly fail
            // Chrome and Edge close WebDriver and crash all tests after Top3
            // if((await driver.getCapabilities()).getBrowserName() === "firefox")
                await delay(500);

            let section:WebElement = await getElByClass(driver, ttl, classIdentifier);
            let articles:WebElement[] = await section.findElements(By.css(tag));
            if(n === 0)
                expect(articles.length).toBe(expected);
            await articles[n].click();
            await Check404AndGoBack();
        });
    };


    async function CheckAgendaNumbers(position:string){
        let positionID:string;
        let expected:number;
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
            // Chrome and Edge close WebDriver and crash all tests after Top3
            // if((await driver.getCapabilities()).getBrowserName() === "firefox")
                await delay(500);

            let section:WebElement = await getElByID(driver, ttl, positionID);
            let articles:WebElement[] = await section.findElements(By.css("article"));
            expect(articles.length).toBe(expected);
        });
    };


    async function Check404AndGoBack(){
        await driver.wait(until.elementLocated(By.className("lazyautosizes lazyloaded")), ttl);
        expect(await driver.getTitle()).not.toMatch(/404: Not Found/);

        await driver.navigate().back();
        await driver.wait(until.elementLocated(By.id("category-bottom")), ttl, "Waiting page to load")
    };

};