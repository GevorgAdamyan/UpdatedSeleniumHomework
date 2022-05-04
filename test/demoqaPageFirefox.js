const { By, Builder } = require("selenium-webdriver");
require("geckodriver");
const expect = require('chai').expect


describe("Adding new user in Firefox Browser", function () {
    it("Successfully addition of the new user in Firefox Browser", async function () {
        
        //Input variables

        let url = "https://demoqa.com/text-box";
        let fullName = "Name Surename";
        let testEmail = "email@gmail.com";
        let adress = "40, 18 Bagratunyats ave., Yerevan, RA";
        let driver = await new Builder().forBrowser("firefox").build();

        //Visiting DemoQA.com

        await driver.get(url);

        // Assertion that we are in the correct page

        let currentUrl = await driver.getCurrentUrl()
        expect(currentUrl).to.equal(url);

        //Filling the Submit Form

        let userNameField = await driver.findElement(By.id("userName"));
        let userEmailField = await driver.findElement(By.id("userEmail"));
        let currentAddressField = await driver.findElement(By.id("currentAddress"));
        let permanentAddressField = await driver.findElement(By.id("permanentAddress"));

        userNameField.sendKeys(fullName);
        userEmailField.sendKeys(testEmail);
        currentAddressField.sendKeys(adress);
        permanentAddressField.sendKeys(adress);

        //Submitting the Form

        await driver.findElement(By.id("submit")).click();

        //Assertions

        let name = await driver.findElement(By.id("name")).getText()
        let email = await driver.findElement(By.id("email")).getText()
        let currentAddressCheck = await driver.findElement(By.css('#currentAddress:nth-child(3)')).getText()
        let permanentAddressCheck = await driver.findElement(By.css('#permanentAddress:last-child.mb-1')).getText()

        expect(name).to.contain(fullName);
        expect(email).to.contain(testEmail);
        expect(currentAddressCheck).to.contain(adress);
        expect(permanentAddressCheck).to.contain(adress);

        //Closing the browser

        await driver.quit();
    })
})