const { Builder, By, Key, until } = require ('selenium-webdriver');
const assert = require ('assert');

async function souceDemoLoginTest(){
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get("https://www.saucedemo.com/");
        // Input Username and Password
        await driver.findElement (By.id('user-name')).sendKeys('standard_user');
        await driver.findElement (By.xpath("//input[@id='password']")).sendKeys('secret_sauce');

        // Click button Login
        await driver.findElement (By.id('login-button')).click();

        // Verifikasi telah login aplikasi dan mencari judul "Swag Lab"
        let titleText = await driver.findElement (By.css('.app_logo')).getText();
        assert.strictEqual(titleText.includes('Swag Labs'), true, "Title does not include 'Swag Labs' ");

        // Verifikasi telah login dan mencari Burger button
        let menuButton = await driver.findElement (By.id('react-burger-menu-btn'));
        assert.strictEqual(await menuButton.isDisplayed(), true, 'Menu Button is not visible');

        // Add item to Cart
        await driver.findElement (By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']")).click();

        // Verifikasi check item sudah masuk keranjang
        await driver.findElement (By.xpath("//div[@id='shopping_cart_container']/a[1]")).click();

        let yourCart = await driver.findElement (By.xpath("//span[@class='title']")).getText();
        assert.strictEqual(yourCart.includes('Your Cart'), true, "Title does not include 'Your Cart' ");
        
        let itemQty = await driver.findElement (By.xpath("//div[@class='cart_quantity']"));
        assert.strictEqual(await itemQty.isDisplayed(), true, 'Item not insert in Your Cart');

    } finally {
        await driver.quit();
    }
}

souceDemoLoginTest();