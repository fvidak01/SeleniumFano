DON'T OVERLOOK THIS: things you need before running WebDriver tests (reminder for myself as well):
	
  	Must have browser webdrivers in $PATH for browsers you want to test (and have those browsers installed)
    		Chrome:   https://sites.google.com/a/chromium.org/chromedriver/downloads
    		Firefox:  https://github.com/mozilla/geckodriver/releases
    		Safari:   in Terminal: safaridriver --enable
    		Edge:     https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/
				Pay close attention to the version. Edge WebDriver version must be the same as Edge browser that is installed.	
			
	For additional info: https://www.selenium.dev/downloads/
	
WIP BELOW! Suggestions welcome, I'm noob at this. Need to check it again.

	Using Selenium WebDriver 4 Javascript bindings: https://www.npmjs.com/package/selenium-webdriver
	Documentation of javascript webdriver 4 bindings: https://www.selenium.dev/selenium/docs/api/javascript/index.html

NEW PROJECT (all above applies and I mean all):

	npm init	
	npm install -g jest
	npm install selenium-webdriver
	npm install --save-dev typescript ts-jest
	npx jest --init
		when asked if you want to use Typescript, choose NO
		add-> preset: "ts-jest", <-to module.exports in jest.config.js
		
SETTING FROM THIS REPOSITORY (after cloning it):
	
	npm install
	
	make .jest/setEnvVars.js (or comment out setupFiles line in jest.config.js if you don't want to run tests that use process.env.)
	
	Just a note: might need 'npm install -g jest' if jest commands don't want to run tests. 'npm t' runs tests without jest in global.


HOW TO RUN THOSE TESTS, SAFARI IS SPECIAL:

	npm run test nameOfTest(s)(suites)
	npm t nameOfTest(s)(suites)
	jest "nameOfTest(s)(suites)"
		
	NOT SAFARI TESTS (and to explicitely tell jest how many test suites to run at same time, 'N' for number of worker threads, jest has some logic behind the implicit number):
		jest --maxWorkers=N "nameOfTestsOrSuites"
		
	SAFARI TESTS (and to run test suites one by one):
		jest --maxWorkers=1 "nameOfTestsOrSuites"
	
