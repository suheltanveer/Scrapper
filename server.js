const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = 'https://newepisodes.co/';
    await page.goto(url);

    const newEpisodes = await page.evaluate(
        () => Array.from(document.querySelectorAll('.popular-list-item[data-type="show"]'), element => ({
            title: element.querySelector('h5').textContent,
            latestEpisode: element.querySelector('.mini').textContent.trim()
        }))
    )

    console.dir(newEpisodes, { 'maxArrayLength': null })
    await browser.close();
})();