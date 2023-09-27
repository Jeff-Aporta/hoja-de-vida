const puppeteer = require("puppeteer");

let videos = require('./Youtube');

module.exports = function (app_pack) {
    let { io, mongo } = app_pack;

    io.on('connection', function (socket) {

        socket.on('Tomar pantallazo', async function (url, nombre) {
            puppeteer
                .launch({
                    defaultViewport: {
                        width: 640,
                        height: 360,
                    },
                })
                .then(async (browser) => {
                    const page = await browser.newPage();
                    await page.goto(url);
                    await new Promise((resolve) => setTimeout(resolve, 5000));
                    await page.screenshot({ path: nombre + ".png" });
                    await browser.close();
                });
        });

        socket.on('Obtener todos los videos', async function () {
            socket.emit('Todos los videos', videos);
        });
    });
}