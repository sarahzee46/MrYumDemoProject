import * as playwright from 'playwright';
import { addToCart,assertCart,verifyExistingCustomer,dineInPath, checkoutOrder } from "./PageFunctions";
import * as constants from "./Constants";

async function main() {
    //launch the browser
    const browser = await playwright.chromium.launch({
        headless : false,
        timeout : 60000,
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(constants.url); 
       
        //navigating through the dine-in menu
        const dineInPage = await dineInPath(page);   
        //adding products to the cart
        await addToCart(dineInPage,constants.product1,constants.product1Count, constants.product1Mod);
        await addToCart(dineInPage,constants.product2, constants.product2Count);
        await addToCart(dineInPage,constants.product3, constants.product3Count);

        dineInPage.waitForSelector('[aria-label="'+constants.cartLabel+'"]');
        await dineInPage.click('[aria-label="'+constants.cartLabel+'"]');
        //verifying the cart contents
        await assertCart (dineInPage);
        //performing order checkout
        const checkoutPage = await checkoutOrder(dineInPage);
        //processing the payment
        const paymentPage = await verifyExistingCustomer(checkoutPage);

}

main();

