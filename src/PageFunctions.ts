import * as playwright from 'playwright';
import * as constants from "./Constants";

const assert = require ('assert');

   
export async function verifyExistingCustomer(page:playwright.Page) {
    /* This function performs the following actions
    1. verifies the customer information
    2. processes the payment
    */

    await page.click('[aria-label="'+constants.phoneNumberBoxSearch+'"]'); 
    await page.fill('input[type="'+constants.phoneNumberBox+'"]',constants.phoneNumber);
    await page.click("text="+constants.pinCodeBoxSearch);
    await page.click('[aria-label="'+constants.pinCodeBoxSearchText+'"]'); 
    await page.fill('input[type="'+constants.pinCodeBox+'"]',constants.pinCode);
    await page.waitForSelector("text="+constants.payNowButton);

    await page.click("text="+constants.payNowButton);
    await page.waitForSelector("text="+constants.confirmation);

    const value = await page.$eval("text="+constants.confirmation, el => el.textContent);
    assert(value === 'Thanks! How was your experience?');
    
    return page;
}

export async function addToCart(page:playwright.Page, productName:string, numberofProducts =1, requiredOptions = "none") {
    /*This function performs the following actions
    1. selects the products and adds it to the cart
    2. selects extra options for the product(if any)
    3. increases the quantity of desired product

    */
     
    await page.waitForSelector('a[href="'+constants.listPage+'/'+productName+'"]');
    await page.click('a[href="'+constants.listPage+'/'+productName+'"]');

    if (requiredOptions != "none") {
            await page.click("text="+requiredOptions);          
    }
   
    if (numberofProducts > 1){        
        await page.waitForSelector('[aria-label="'+constants.increaseQuantity+'"]');
        //added this manual timeout because the page was not loading completely and adding additional item was getting impacted
        await page.waitForTimeout(3000);
        
        for (let i = 1; i < numberofProducts; i++) {
            
            await page.click('[aria-label="'+constants.increaseQuantity+'"]');
        }
    }
    
    await page.waitForSelector("text="+constants.addToCartButton);
    await page.click("text="+constants.addToCartButton);
    return page;
}

export async function dineInPath (page: playwright.Page){
    /*
    This function performs the following actions
    1. confirms the table number
    2. navigates to the dine-in menu
    */

        await page.click("text="+constants.viewDineinMenu);
        await page.click('input[name='+constants.tableNumberBox+']');        
        await page.keyboard.type(constants.tableNumber);
        await page.click("text="+constants.confirmButton);            
        await page.waitForSelector('a[href="' + constants.listPage + '"]');
        
        await page.click('a[href="' + constants.listPage + '"]');
        return page;
}


export async function checkoutOrder(page: playwright.Page){
    /*
    This function performs the below action:
    1.  performs the checkout for the selected items
    */ 
    await page.click("text="+constants.checkoutButton);
    await page.waitForSelector("text="+constants.addTipAndPay);
    await page.waitForTimeout(3000);
    await page.click("text="+constants.addTipAndPay);
    return page;
}

export async function assertCart (page: playwright.Page){
    /*This function performs the following assertions on the cart
    1.Table number
    2.total cost 
    3.discount
    4.products
    5.mod/upsell
    */

    //waiting for the cart to load
    await page.waitForTimeout(4000)

    await page.waitForSelector("text=Table number")
    const tableNumberValue = await page.$eval("text=Table number", el => el.textContent.trim());
    assert (tableNumberValue.toLowerCase() === "table number "+constants.tableNumber);
    
    const totalCostValue = await page.$eval("text="+constants.totalCost, el => el.textContent.trim());
    assert ( "-" +constants.totalCost ===  totalCostValue);

    const discountValue = await page.$eval("text="+constants.discount, el => el.textContent.trim());
    assert ( "-" + constants.discount === discountValue);

    const product1Value = await page.$eval("text="+constants.product1DisplayName, el => el.textContent.trim());
    assert ( constants.product1DisplayName.toLowerCase() === product1Value.toLowerCase());

    const product2Value = await page.$eval("text="+constants.product2DisplayName, el => el.textContent.trim());
    assert ( constants.product2DisplayName.toLowerCase() === product2Value.toLowerCase());

    const product3Value = await page.$eval("text="+constants.product3DisplayName, el => el.textContent.trim());
    console.log ( constants.product3DisplayName.toLowerCase() +"-"+ product3Value.toLowerCase());
    assert (constants.product3DisplayName.toLowerCase() === product3Value.toLowerCase() )

    const product1ModValue = await page.$eval("text="+constants.product1Mod, el => el.textContent.trim());
    console.log ( constants.product1Mod.toLowerCase() +"-"+ product1ModValue.toLowerCase());
    assert (constants.product1Mod.toLowerCase() === product1ModValue.toLowerCase().replace("1x ","") )


}


