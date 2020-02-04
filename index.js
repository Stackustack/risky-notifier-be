const express = require('express')
const puppeteer = require("puppeteer");

const app = express()
const port = 3000

app.get('/', async (req, res) => {
    let price

    const run = async () => {
        // open the browser and prepare a page
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        // open the page to scrape
        await page.goto("https://www.riskmadeinwarsaw.com/en/kategorie-ubran-en/gray-matter-turtleneck-gray/");

        price = await page.evaluate(() => {
            return document.querySelector(".ty-product-block__price-actual .ty-price-update .ty-price bdi .ty-price-num:first-of-type").textContent
        });

        console.log(price)

        // close the browser 
        await browser.close();

        return [price]
    };

    res.send(await run())
})



app.listen(port, () => console.log(`Started server on port ${port}!`))