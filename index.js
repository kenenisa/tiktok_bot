// const ffmpeg = require("ffmpeg")
// const command = require("./util/command.js");
// const deleteFile = require("./util/deleteFile.js");
// const prepareVideo = require("./util/prepareVideo.js");
// const takeScreenshot = require("./util/takeScreenshot.js");
// const rand = new Date().toDateString().replace(/\s/g, "-") + new Date().getTime()

// const args = process.argv.slice(2);

// const merged = rand + 'su';
// const final = rand + 'final';

// const config = {
//     audio: `./assets/audio/${args[0]}.mp3`,
//     full_video: `./out/${args[1]}.mp4`,
//     temp: `./out/temp/${rand}.mp4`,
//     merged: `./out/final/${merged}.mp4`,
//     final: `./out/final/${final}.mp4`,
//     ventPost: args[2]
// }


// const getAudioInfo = (resolve) => {
//     new ffmpeg(config.audio, (err, audio) => {
//         if (err) return console.log(err);
//         console.log("audio ready");
//         resolve(audio.metadata.duration.seconds);
//     })
// }

// const getVideoInfo = (audioDuration, resolve) => {
//     new ffmpeg(config.full_video, (err, video) => {
//         if (err) return console.log(err);
//         console.log("video ready");
//         const starting = Math.floor(Math.random() * (video.metadata.duration.seconds - audioDuration + 1))
//         resolve(starting, video)
//     })
// }

// const cutVideo = (starting, video, audioDuration, resolve) => {
//     video.setVideoStartTime(starting)
//         .setVideoDuration(audioDuration + 1)
//         .save(config.temp, (err) => {
//             if (err) return console.log(err);
//             console.log('video clipped');
//             resolve()
//         })
// }
// const overlayAudio = (resolve) => {
//     command(`ffmpeg -i ${config.temp} -i ${config.audio} -map 0:v -map 1:a -c:v copy ${config.merged}`)
//         .then(() => {
//             console.log("merged audio with video")
//             resolve()
//         }).catch(console.log)
// }

// const addImage = (imagePath, resolve) => {
//     try {

//         new ffmpeg(config.merged, (err, video) => {
//             console.log("proccessing image watermark");
//             video.fnAddWatermark(imagePath, config.final, {
//                 position: 'C'
//             }, async function (error, file) {
//                 if (!error)
//                     console.log('New video file: ' + file);
//                 await deleteFile(imagePath);
//                 await deleteFile(config.merged);
//                 resolve();
//             });

//         })
//     } catch (e) {
//         console.log(e);
//     }
// }
// const prepare = args[0] === "prepare" ? true : false;
//     (async () => {
//         if (prepare) {
//             await prepareVideo(args[1]);
//         } else {
//             try {
//                 getAudioInfo((audioDuration) => {
//                     getVideoInfo(audioDuration, (starting, video) => {
//                         cutVideo(starting, video, audioDuration, () => {
//                             overlayAudio(async () => {
//                                 await deleteFile(config.temp);
//                                 console.log("deleted temp");
//                                 console.log("FINISHED UP! -> ", config.merged);
//                                 takeScreenshot(config.ventPost, (imagePath) => {
//                                     addImage(imagePath, () => {
//                                         console.log("Cleaned up");
//                                         console.log("DONE!");
//                                         process.exit();
//                                     })
//                                 });
//                             })
//                         })
//                     })
//                 })

//             } catch (e) {
//                 console.log(e);
//             }
//         }
//     })()
const getAudio = require("./util/getAudio.js");
getAudio()