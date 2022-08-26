const ffmpeg = require("ffmpeg")
const command = require("./util/command.js");
const deleteFile = require("./util/deleteFile.js");
const prepareVideo = require("./util/prepareVideo.js");
const takeScreenshot = require("./util/takeScreenshot.js");
const rand = new Date().toDateString().replace(/\s/g, "-") + new Date().getTime()
const getAudio = require("./util/getAudio.js");
const opacity = require("./util/opacity.js");

const args = process.argv.slice(2);

const merged = rand + 'su';
const overlay = rand + 'ol';
const final = rand + 'final';

const config = {
    audio: ``,
    full_video: `./out/videos/${args[0]}.mp4`,
    temp: `./out/temp/${rand}.mp4`,
    merged: `./out/final/${merged}.mp4`,
    overlay: `./out/final/${overlay}.mp4`,
    final: `./out/final/${final}.mp4`,
    music: `./assets/music/${args[1]}.mp3`,
    ventPost: args[2],
}
const audioText = `
Take a guess what I wish for us if we had a SECOND chance. The first one wasn't really a chance but it Alright. 
I see us living in downtown Europe or U.S.A., I want to take you for a walk on a cold Christmas, holding hands while we use the other hand to hold ice cream, talking only about us, wearing a big black for me and white coat, staring at each other's eyes and the light. 

But I can't keep that high hope, I'll let time run it, if it really means it'll come to us, and we'll try our given chance.`

const getAudioInfo = (resolve) => {
    getAudio(audioText, (audioPath) => {
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
        .setVideoDuration(audioDuration + 1)
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
    command(`ffmpeg -i ${config.merged} -i ${config.music} -filter_complex "[1:a]volume=0.20,apad[A];[0:a][A]amerge[out]" -c:v copy -map 0:v -map [out] -y ${config.overlay}`)
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
                position: 'C'
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
                                takeScreenshot(config.ventPost, (imagePath) => {
                                    opacity(imagePath, 0.7, imgPath => {
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
