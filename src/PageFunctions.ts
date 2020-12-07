import * as playwright from 'playwright';
import * as constants from "./Constants";

const assert = require ('assert');

   
export async function verifyExistingCustomer(page:playwright.Page) {
    /* This function performs the following actions
    1. verifies the customer information
    2. processes the payment
    */

    const phoneNumberBoxSearch = "Please enter a phone number without the country dial code.";
    const phoneNumberBox = "text";
    const phoneNumber = "400000000";
    const pinCodeBoxSearch = "SEND SMS CODE";
    const pinCodeBoxSearchText = "Please enter your pin code";
    const pinCodeBox = "text";
    const pinCode = "3066";
    const payNowButton = "PAY NOW";
    const confirmation = 'Thanks! How was your experience?';

    await page.click('[aria-label="'+phoneNumberBoxSearch+'"]'); 
    await page.fill('input[type="'+phoneNumberBox+'"]',phoneNumber);
    await page.click("text="+pinCodeBoxSearch);
    await page.click('[aria-label="'+pinCodeBoxSearchText+'"]'); 
    await page.fill('input[type="'+pinCodeBox+'"]',pinCode);
    await page.waitForSelector("text="+payNowButton);

    await page.click("text="+payNowButton);
    await page.waitForSelector("text="+confirmation);

    const value = await page.$eval("text="+confirmation, el => el.textContent);
    assert(value === 'Thanks! How was your experience?');
    
    return page;
}

export async function addToCart(page:playwright.Page, productName:string, numberofProducts =1, requiredOptions = "none") {
    /*This function performs the following actions
    1. selects the products and adds it to the cart
    2. selects extra options for the product(if any)
    3. increases the quantity of desired product

    */

   const addToCartButton = "Add to cart";
   const increaseQuantity = "Add one";
   

     
    await page.waitForSelector('a[href="'+constants.listPage+'/'+productName+'"]');
    await page.click('a[href="'+constants.listPage+'/'+productName+'"]');

    if (requiredOptions != "none") {
            await page.click("text="+requiredOptions);          
    }
   
    if (numberofProducts > 1){        
        await page.waitForSelector('[aria-label="'+increaseQuantity+'"]');
        //added this manual timeout because the page was not loading completely and adding additional item was getting impacted
        await page.waitForTimeout(constants.lowerTimeoutLimit);
        
        for (let i = 1; i < numberofProducts; i++) {
            
            await page.click('[aria-label="'+increaseQuantity+'"]');
        }
    }
    
    await page.waitForSelector("text="+addToCartButton);
    await page.click("text="+addToCartButton);
    return page;
}

export async function dineInPath (page: playwright.Page, tableNumber: string){
    /*
    This function performs the following actions
    1. confirms the table number
    2. navigates to the dine-in menu
    */

   const viewDineinMenu = "View Dine in Menu";
   const tableNumberBox = "tableNumber";
   const confirmButton = "Confirm";
   

        await page.click("text="+viewDineinMenu);
        await page.click('input[name='+tableNumberBox+']');        
        await page.keyboard.type(tableNumber);
        await page.click("text="+confirmButton);            
        await page.waitForSelector('a[href="' + constants.listPage + '"]');
        
        await page.click('a[href="' + constants.listPage + '"]');
        return page;
}


export async function checkoutOrder(page: playwright.Page){
    /*
    This function performs the below action:
    1.  performs the checkout for the selected items
    */ 

    
    const checkoutButton = "CHECKOUT";
    const addTipAndPay = "ADD TIP AND PAY";

    await page.click("text="+checkoutButton);
    await page.waitForSelector("text="+addTipAndPay);
    await page.waitForTimeout(constants.lowerTimeoutLimit);
    await page.click("text="+addTipAndPay);
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
    await page.waitForTimeout(constants.upperTimeoutLimit)

    await page.waitForSelector("text=Table number")
    const tableNumberValue = await page.$eval("text=Table number", el => el.textContent.trim());
    assert (tableNumberValue === "Table number "+constants.tableNumber);
    await console.log("assertion for table number completed.");
    
    const totalCostValue = await page.$eval("text="+constants.totalCost, el => el.textContent.trim());
    assert ( totalCostValue === "-" +constants.totalCost );
    await console.log("assertion for total cost completed.");

    const discountValue = await page.$eval("text="+constants.discount, el => el.textContent.trim());
    assert (discountValue === "-" + constants.discount );
    await console.log("assertion for discount value completed.");

    const product1Value = await page.$eval("text="+constants.product1DisplayName, el => el.textContent.trim());
    assert ( product1Value === constants.product1DisplayName );
    await console.log("assertion for product1 value completed.");

    const product2Value = await page.$eval("text="+constants.product2DisplayName, el => el.textContent.trim());
    assert ( product2Value === constants.product2DisplayName );
    await console.log("assertions for product2 value completed.");

    const product3Value = await page.$eval("text="+constants.product3DisplayName, el => el.textContent.trim());
    assert (product3Value === constants.product3DisplayName );
    await console.log("assertions for product3 value completed.");

    const product1ModValue = await page.$eval("text="+constants.product1Mod, el => el.textContent.trim());
    assert (product1ModValue === constants.product1ModDisplayName );
    await console.log("assertions for product1 mod value completed.");
    
    
    const product1CounttValue = await page.$eval('text='+constants.product1DisplayName, el =>  el.parentElement.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.textContent);
    assert (product1CounttValue === constants.product1Count.toString());
    await console.log("assertions for product1 count value completed.");
    const product2CountValue = await page.$eval('text='+constants.product2DisplayName, el =>  el.parentElement.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.textContent);
    assert (product2CountValue === constants.product2Count.toString());
    await console.log("assertions for product2 count value completed.");
    const product3CountValue = await page.$eval('text='+constants.product3DisplayName, el =>  el.parentElement.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.textContent);
    assert (product3CountValue === constants.product3Count.toString());
    await console.log("assertions for product3 count value completed.");
    const product1CostValue = await page.$eval('text='+constants.product1DisplayName, el =>  el.parentElement.nextElementSibling.firstElementChild.nextElementSibling.textContent);
    assert ( product1CostValue === constants.product1Cost );
    await console.log("assertions for product1 cost value completed.");
    const product2CostValue = await page.$eval('text='+constants.product2DisplayName, el =>  el.parentElement.nextElementSibling.firstElementChild.nextElementSibling.textContent);
    assert (product2CostValue === constants.product2Cost);
    await console.log("assertions for product2 cost value completed.");
    const product3CostValue = await page.$eval('text='+constants.product3DisplayName, el =>  el.parentElement.nextElementSibling.firstElementChild.nextElementSibling.textContent);
    assert (product3CostValue === constants.product3Cost);
    await console.log("assertions for product3 cost value completed.")
}



