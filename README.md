# MrYumDemoProject - DineIn E2E Automation Test

This project is for automation testing of Dine-In Menu path on MrYum demo site

## Pre Requisites

NPM installation is required.
If not installed already, please follow the below link

https://phoenixnap.com/kb/install-node-js-npm-on-windows

## Checkout Repository

PLease checkout the current repo using the git clone command

git clone https://github.com/sarahzee46/MrYumDemoProject.git

## Installation

Once the npm installation and Git checkout is done.please perform the below steps

1. install ts-node and typescript

```bash
npm i ts-node typescript
```
2. Install playwright

```bash
npm i -D playwright
```

please ignore if these steps are already completed

## Usage

To run the test please run the below command

```bash
npx ts-node src/DineInPathTest.ts
```

the above command will run the test on a chromium browser.
Below functionalities are being performed.

* Navigating to dine in menu
* adding items to cart
* assertion on cart
* checkout with existing user

## Output

A sample video output is available on the output folder