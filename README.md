Things you need before running this:

	have node/npm installed
	
  have browser webdrivers in $PATH (and have those browsers installed, Edge webdriver version has to be the same as Edge version installed)
	
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
		
		to explicitely run more suites at same time, substitute 'N' with number of worker threads, npm default is 3, jest has some logic behind the number
		jest --maxWorkers=N "nameOfTestsOrSuites"
		
		to run sequentially (required for running multiple Safari tests or suites)
		jest --maxWorkers=1 "nameOfTestsOrSuites"
	
	npm t nameOfTest(s)(suites)
