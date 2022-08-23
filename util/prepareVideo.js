const command = require("./command.js");

module.exports =  async (input) => {
    console.log(`Processing ./assets/${input}.mp4`);
    await command(`ffmpeg -i ./assets/${input}.mp4 -filter:v "crop=405:in_h" -an ./out/${input}.mp4`);
    console.log(`FINISHED => ./out/${input}.mp4`);
}