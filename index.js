const ffmpeg = require("ffmpeg")
require('dotenv').config()
require("./bootstrap.js")
const command = require("./util/command.js");
const deleteFile = require("./util/deleteFile.js");
const prepareVideo = require("./util/prepareVideo.js");
const takeScreenshot = require("./util/takeScreenshot.js");
const rand = new Date().toDateString().replace(/\s/g, "-") + new Date().getTime()
const getAudio = require("./util/getAudio.js");
const opacity = require("./util/opacity.js");
const getTextFromTelegram = require("./util/getTextFromTelegram.js");

const args = process.argv.slice(2);

if(!args[0]){
    console.log("No arguments provided! Exiting...");
    process.exit()
}
if(args[0] === "bootstrap"){
    console.log("Project was bootstrapped successfully!");
    process.exit()
}


const merged = rand + 'su';
const overlay = rand + 'ol';
const final = rand + 'final';

const config = {
    audio: ``,
    full_video: `./out/${args[0]}.mp4`,
    temp: `./out/temp/${rand}.mp4`,
    merged: `./out/final/${merged}.mp4`,
    overlay: `./out/final/${overlay}.mp4`,
    final: `./out/final/${final}.mp4`,
    music: `./assets/music/${args[1]}.mp3`,
    ventPost: args[2],
}

if(!fs.existsSync(config.full_video) || !fs.existsSync(config.music)){
    console.log(`${config.full_video} or ${config.mnusic} do not seem to exist! Exiting...`);
    process.exit();
}

const getAudioInfo = async (resolve) => {
    getAudio(await getTextFromTelegram(config.ventPost), (audioPath) => {
        config.audio = audioPath
        console.log(audioPath, "is here");
        new ffmpeg(config.audio, (err, audio) => {
            if (err) return console.log(err);
            console.log("Audio ready");
            resolve(audio.metadata.duration.seconds);
        })
    })
}

const getVideoInfo = (audioDuration, resolve) => {
    new ffmpeg(config.full_video, (err, video) => {
        if (err) return console.log(err);
        console.log("video ready");
        const starting = Math.floor(Math.random() * (video.metadata.duration.seconds - audioDuration + 1))
        resolve(starting, video)
    })
}

const cutVideo = (starting, video, audioDuration, resolve) => {
    video.setVideoStartTime(starting)
        .setVideoDuration(audioDuration + 2)
        .save(config.temp, (err) => {
            if (err) return console.log(err);
            console.log('video clipped');
            resolve()
        })
}
const overlayAudio = (resolve) => {
    command(`ffmpeg -i ${config.temp} -i ${config.audio} -map 0:v -map 1:a -c:v copy ${config.merged}`)
        .then(() => {
            console.log("merged audio with video")
            resolve()
        }).catch(console.log)
}
const overlayMusic = (resolve) => {
    command(`ffmpeg -i ${config.merged} -i ${config.music} -filter_complex "[1:a]volume=${process.env.background_music_volume},apad[A];[0:a][A]amerge[out]" -c:v copy -map 0:v -map [out] -y ${config.overlay}`)
        .then(() => {
            console.log("Music Added!")
            resolve()
        }).catch(console.log)
}
const addImage = (imagePath, resolve) => {
    try {

        new ffmpeg(config.overlay, (err, video) => {
            console.log("processing image watermark");
            video.fnAddWatermark(imagePath, config.final, {
                position: process.env.text_screenshot_position
            }, async function (error, file) {
                if (!error)
                    console.log('New video file: ' + file);
                await deleteFile(imagePath);
                await deleteFile(config.merged);
                await deleteFile(config.overlay);
                resolve();
            });

        })
    } catch (e) {
        console.log(e);
    }
}
const prepare = args[0] === "prepare" ? true : false;
(async () => {
    if (prepare) {
        await prepareVideo(args[1]);
    } else {
        try {
            getAudioInfo((audioDuration) => {
                getVideoInfo(audioDuration, (starting, video) => {
                    cutVideo(starting, video, audioDuration, () => {
                        overlayAudio(async () => {
                            await deleteFile(config.temp);
                            await deleteFile(config.audio);
                            console.log("deleted temp");
                            console.log("Overlay! -> ", config.merged);
                            overlayMusic(() => {
                                takeScreenshot(config.ventPost, video.metadata.video.resolution, (imagePath) => {
                                    opacity(imagePath, Number(process.env.text_screenshot_opacity), imgPath => {
                                        console.log('Edited image');
                                        addImage(imgPath, () => {
                                            console.log("Cleaned up");
                                            console.log("DONE!");
                                            process.exit();
                                        })
                                    })
                                });
                            })
                        })
                    })
                })
            })

        } catch (e) {
            console.log(e);
        }
    }
})()