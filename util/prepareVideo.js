const command = require("./command.js");
const ffmpeg = require("ffmpeg");

module.exports = (input) => {
    console.log(`Processing ./assets/${input}.mp4`);
    new ffmpeg(`./assets/${input}.mp4`,async (err,video)=>{
        if(err){
            console.log(err);
            console.log(`./assets/${input}.mp4 doesn't exist. Exiting...`);
            process.exit()
        }
        const width = Math.floor((9 * video.metadata.video.resolution.h)/16)
        await command(`ffmpeg -i ./assets/${input}.mp4 -filter:v "crop=${width}:in_h" -an ./out/${input}.mp4`);
        console.log(`FINISHED => ./out/${input}.mp4`);
    })
}