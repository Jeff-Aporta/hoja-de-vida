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
      await page.goto("https://chaturbate.com/monika_youthfull/");
      await page.evaluateHandle(() => {
        let b = document.querySelector("#close_entrance_terms");
        if (b) {
          b.click();
        }
      });
      while (true) {
        await page.screenshot({
          path: "CB/" + (i++).toString().padStart(7, 0) + ".jpg",
          type: "jpeg",
        });
      }
    });
}

tomarshoot();
