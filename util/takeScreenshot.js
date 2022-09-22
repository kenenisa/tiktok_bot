const { Builder, By, Keys, Browser } = require("selenium-webdriver");
const sharp = require('sharp');
// const chromedriver = require("chromedriver");
// const chrome = require("selenium-webdriver/chrome")
// chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

let fs = require("fs");
var http = require('http');
const deleteFile = require("./deleteFile");
const imagePath = "./out/temp/image.png"
const finalImage = "./out/temp/finalImage.png";

const html = id => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>telegram</title>
</head>
<body>
<style>
    iframe{
        position:absolute;
        top:-55px;
        left:-16px;
    }
</style>
<script async src="https://telegram.org/js/telegram-widget.js?19" data-telegram-post="testtestte13/${id}" data-width="375" data-userpic="false"></script>
</body>
</html>
`;


module.exports = (post, resolution, resolve) => {

  http.createServer(function (req, res) {
    // res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(html(post));
    res.end();
  }).listen(8081

    , () => {
      async function takeScreenshot(url) {
        //Wait for browser to build and launch properly
        let driver = await new Builder().forBrowser("chrome").build();

        //Navigate to the url passed in
        await driver.get(url);
        await driver.manage().window().maximize();
        const window = await driver.executeScript(() => {
          return [window.innerWidth, window.innerHeight]
        })
        console.log({ window });
        const el = await driver.findElement({ id: 'telegram-post-testtestte13-' + post })
        const con = await el.getRect()
        const block = [con.width - 16, con.height - 85]
        console.log({ block });
        //Capture the screenshot
        let image = await driver.takeScreenshot();
        console.log("took a screenshot");
        await fs.writeFileSync(imagePath, image, "base64");
        await driver.quit();
        const sharpImage = sharp(imagePath)
        const metadata = await sharpImage.metadata()
        console.log({ metawidth: metadata.width, metaheight: metadata.height });
        const dimensions = [(metadata.width * block[0]) / window[0], (metadata.height * block[1]) / window[1]].map(e => Math.floor(e))
        console.log({ dimensions });
        sharpImage.extract({ left: 0, top: 0, width: dimensions[0], height: dimensions[1] })
          .resize({ width: Math.floor(resolution.w * 0.7) })
          .toFile(finalImage)
          .finally(async () => {
            // await deleteFile(imagePath)
            resolve(finalImage)
          })
      }
      takeScreenshot("http://localhost:8081/?post=" + post);



    });
}
// takeScreenshot("./telegram.html");


