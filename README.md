Things you need before running this:

	have node/npm installed
	
  have browser webdrivers in $PATH
	
    Chrome:   https://sites.google.com/a/chromium.org/chromedriver/downloads
		
    Firefox:  https://github.com/mozilla/geckodriver/releases
		
    Safari:   in Terminal: safaridriver --enable
		
    Edge:     https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/
		
  have selenium-webdriver installed / in $PATH
	
    npm install selenium-webdriver
   
If needed, from main directory path:

	npm install
	
	npx jest --init
	
    when asked if use Typescript -> NO
    add-> preset: "ts-jest", <-to module.exports in jest.config.js

To run tests:

	npm run test nameOfTest(s)(suites)
	
	jest	"nameOfTest(s)(suites)"
		
		to explicitely run ore suites at same time, substitute 'N' with number of worker threads, npm and jest have default at 3
		jest --maxWorkers=N "nameOfTestsOrSuites"
		
		to run sequentially (running multiple Safari tests requires it to work), 
		jest --runInBand "nameOfTestsOrSuites"
		npm t --runInBand "nameOfTestsOrSuites)
	
	npm t nameOfTest(s)(suites)
