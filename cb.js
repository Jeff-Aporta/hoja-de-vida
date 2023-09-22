const puppeteer = require("puppeteer");

function tomarshoot() {
  let i = 0;

  puppeteer
    .launch({
      defaultViewport: {
        width: 1280,
        height: 720,
      },
    })
    .then(async (browser) => {
      const page = await browser.newPage();
      await page.goto("https://chaturbate.com/soy_sofia/");
      await page.evaluateHandle(() => {
        let b = document.querySelector("#close_entrance_terms");
        if (b) {
          b.click();
        }
      });
      while(true){
        await page.screenshot({ path: "nyt-puppeteer" + (i++) + ".png" });
      }
    });
}

tomarshoot();