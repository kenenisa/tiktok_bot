const { Builder, By, Keys, Browser } = require("selenium-webdriver");
require("chromedriver");
const sharp = require('sharp');

let fs = require("fs");
var http = require('http');
const deleteFile = require("./deleteFile");
const imagePath = "./out/temp/image.png"
const finalImage = "./out/temp/finalImage.png"
module.exports = (post,resolve) => {

  http.createServer(function (req, res) {
    // res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(fs.readFileSync('./assets/telegram.html'));
    res.end();
  }).listen(8081

    , () => {
      async function takeScreenshot(url) {
        //Wait for browser to build and launch properly
        let driver = await new Builder().forBrowser("chrome").build();

        //Navigate to the url passed in
        await driver.get(url);
        await driver.manage().window().maximize();
        const el = await driver.findElement({ id: 'telegram-post-testtestte13-' + post })
        const con = await el.getRect()
        console.log(con);
        //Capture the screenshot
        let image = await driver.takeScreenshot();

        await fs.writeFileSync(imagePath, image, "base64");
        await driver.quit();
        await sharp(imagePath)
          .extract({ left: 0, top: 0, width: con.width - 16, height: con.height - 85 })
          .toFile(finalImage)
          .finally(async () => {
            await deleteFile(imagePath)
            resolve(finalImage)
          })
      }
      takeScreenshot("http://localhost:8081/?post=" + post);



    });
}
// takeScreenshot("./telegram.html");


