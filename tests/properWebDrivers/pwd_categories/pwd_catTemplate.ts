import { WebDriver, WebElement } from "selenium-webdriver";
import { GetDriver, nOrderStringify } from "../../../easifier";
import { CheckLink, GetLinksCount, GetSubcategory, GetSubheaderTitle, ITitleLinkPair } from "./helperCategories";

export function TestSubcategory(
    rootURL: string, 
    titleLinkPairs: ITitleLinkPair[],
    category: string,
    categoryLink: string,
    expectedSubcategoryCount: number){
    // in ms
    const ttl:number = 15000;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 30;

    //
    // Testing Motor category subcategories
    //

    // Available WebDrivers
    const browserList:string[] = ["MicrosoftEdge", "firefox", "chrome"];
    // const browserList:string[] = ["firefox"];


    browserList.forEach(browserDriver =>{
        describe((browserDriver + " tests").toUpperCase(), ()=>{
            let driver: WebDriver;
        
            it("sets up the testing area", async ()=>{
                driver = await GetDriver(browserDriver);
                expect(driver).not.toBeNull();

                await driver.get(rootURL);
            });

            it("checks links count on subheader", async ()=>{
                const linksCount: number = await GetLinksCount(driver);
                expect(linksCount).toBe(expectedSubcategoryCount+1);
            });

            it("checks subheader title link", async ()=>{
                const receivedTitle: string = await GetSubheaderTitle(driver);
                expect(receivedTitle).toMatch(category + " | Finansavisen");
            });


            // Premium category has some unused subcategories
            if(category !== "Premium"){
                for(let i = 0; i < expectedSubcategoryCount; i++){
                    it("checks if "+nOrderStringify(i+1)+" link (\'" + titleLinkPairs[i].title + "\') leads to " + category + " " + titleLinkPairs[i].title, async ()=>{
                        const subcategory: WebElement = await GetSubcategory(driver, i+1);
                        expect(await subcategory.getAttribute("textContent")).toMatch(titleLinkPairs[i].title);
                        expect(await subcategory.getAttribute("href")).toMatch("/" +categoryLink + "/" + titleLinkPairs[i].link);
                        
                        // 3rd Vext subcategory is not finansavisen page but someone's else
                        if(category === "Vext" && i === 2){
                            const vext3rdTitle: string = await CheckLink(driver, subcategory, ttl, true);
                            expect(vext3rdTitle).toMatch("Vext - vi kårer årets vekstselskap");
                        }
                        else{
                            const receivedTitle: string = await CheckLink(driver, subcategory);
                            expect(receivedTitle).toMatch(titleLinkPairs[i].title + " - " + category + " | Finansavisen");
                        };});
                };
            }
            else{
                // 2nd, 12th and 13th links/subcategories are unused
                for(let i = 0; i < 10; i++){
                    it("checks if "+nOrderStringify(i+1)+" link (\'" + titleLinkPairs[i].title + "\') leads to " + category + " " + titleLinkPairs[i].title, async ()=>{
                        let subcategory: WebElement;
                        if(i === 0)
                             subcategory = await GetSubcategory(driver, i+1);
                        else
                             subcategory = await GetSubcategory(driver, i+2); //Shifted more because unused
                        expect(await subcategory.getAttribute("textContent")).toMatch(titleLinkPairs[i].title);
                        expect(await subcategory.getAttribute("href")).toMatch("/" +categoryLink + "/" + titleLinkPairs[i].link);
    
                        const receivedTitle: string = await CheckLink(driver, subcategory);
                        expect(receivedTitle).toMatch(titleLinkPairs[i].title + " - " + category + " | Finansavisen");
                    });
                };
            };

            it("stops "+browserDriver, async ()=>{
                await driver.quit();
            });
        });
    });
};