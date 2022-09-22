# Tiktok bot

This is a nodejs program that will produce vertical videos that can be uploaded to tiktok, youtube short or other social media platforms. Using some [inspiration](https://github.com/elebumm/RedditVideoMakerBot) the bot was built assuming you want to produce reddit style videos on tiktok with some content from your telegram channel. PLEASE read everything in this documentation if you plan to use the bot.

---

## Requirements 🔑

- [Nodejs v16 and npm](https://nodejs.org/en/download/) used as runtime
- [FFmpeg v4.4.2](https://ffmpeg.org/download.html) needed to process media
- [Google chrome](https://support.google.com/chrome/answer/95346?hl=en&co=GENIE.Platform%3DDesktop) used for screenshots of content
- [large text to speech api](https://rapidapi.com/k_1/api/large-text-to-speech/) used to produce audio of the text content
- [Telegram public channel](https://telegram.org/faq_channels#q-what-39s-a-channel) used to get text content

> **Make sure `node -v`, `npm -v` and `ffmpeg -v` work before proceeding**

---

## Getting started 🚀

Here are the things you need to do to get started with the bot...
> ⚠️ Warning
> - **All videos and music you have to import should have the `.mp4` and `.mp3` extension respectively and avoid any spaces in their name**
> - **When you refer to these files in the commands you don't need to use their extensions or path. Just the name of theses files**

1. You need to make sure all the requirements are installed and working. Without them you are gonna run into an issue.
2. Run `npm i` to setup all the dependencies for the bot.
3. Create a `.env` file in your root directory and using `.env.example` file fill out the necessary fields.
4. `assets` and `out` may not exist after you clone the repo but you can quickly create them by using `npm run bootstrap` command.
5. You need to import videos you want to use as backgrounds in your video to `assets` folder.
6. You also need to import music that will be used as background to `assets/music` folder. I recommend you pay close attention to the first few seconds of these music to see if they can go well with the narration of the videos.
7. After you get your files you need to prepare your original video for repeated future use as it is slow to be redoing the same operations over and over. So you need to run `npm run prepare VIDEO_NAME` where VIDEO_NAME is the video name you imported inside `assets/VIDEO_NAME.mp4`. Please make use the VIDEO_NAME does not have spaces as it can create problems with the command.
8. You need to make sure you have your text content posted inside `telegram_public_channel` you specified in `.env` file. Then you have to get the POST_ID for that post. Simplest way to get that would be...
   1. Long press or right click on the post 
   2. Choose the `copy post link` option
   3. Get POST_ID from `https://t.me/telegram_public_channel/POST_ID`
9. To produce a video you need the VIDEO_NAME, MUSIC_NAME and POST_ID which you hopefully have by now...by combining these 3 variables you can create different videos with different content and feel. For more on how you can use these commands check out the [commands](#commands) section below.

---

## Project structure 🗂

Project folder structure so you can better understand what each part of the bot does.

```
tiktok_bot
│   README.md (this file lol)
│   index.js (the entry to the program)   
│   bootstrap.js (creates missing files and dir for the project)    
│   .env (doesn't exist on the repo so you need to create it yourself)   
│   .package.json (defines dependencies)   
│
└───assets (created upon project bootstrap)
│   │
│   └───music (all music should be stored here)
|
└───out (created upon project bootstrap)
│   │
│   └───final (final products will be stored here)
|   |
│   └───temp (temporary files used by the program)
│   
└───util
    │   command.js (used to execute cmd tools)
    │   deleteFile.js (deletes files that are no longer needed)
    │   getAudio.js (produces audio from external audio)
    │   getTextFromTelegram.js (text content from telegram channel)
    │   opacity.js (applies opacity to content screenshot)
    │   prepareVideo.js (used to prepare normal videos for processing )
    │   takeScreenshot.js (takes screenshot of content using chrome)
```

---

## Commands 🧭

### Bootstrap 🏁

> `npm run bootstrap` or `node index.js bootstrap`

No arguments.

This will create the necessary folders for the bot. These folders can actually be created while you run any command for the bot but if you need to make sure they are created before you do anything else you can use this command.

### Prepare 🛠

> `npm run prepare ARGUMENT_VIDEO_NAME` or `node index.js prepare ARGUMENT_VIDEO_NAME`

| Arguments | Purpose |
| --- | --- |
| ARGUMENT_VIDEO_NAME | The video name without the extension(should be `.mp4`) that will be pre-processed for future use. |

This will create a new video in side `out` folder. the purpose of this command is to prepare the video you have for future use. Videos you will provide usually have a 16:9 ratio or something similar. This command will crop this video down to 9:16 ratio which is vertical. Another reason is the video may have a sound that may interfere with the video we'll be producing. This command will also mute that audio before we proceed. If you already have a vertical video with no audio you can import that directly to `out` folder yourself, then it will be reference when you produce your video.

### Production 🏗

> `npm start VIDEO_NAME MUSIC_NAME POST_ID` or `node index.js VIDEO_NAME MUSIC_NAME POST_ID`

| Arguments | Purpose |
| --- | --- |
| VIDEO_NAME | This is the name of the video you used while you run the prepare command above. it will have the same name but in `out` folder. it will be cut randomly with the length of narration of the text produced. |
| MUSIC_NAME | This is directly the name of the music inside `assets/music` you want to use in your video |
| POST_ID | This is the post id from the public channel you chose |

This command will produce your video and place it in `out/final` directory. Filename for that file will be the date for the production. You can take this video and post it anywhere. If you're running into issues make sure your video and music name have no spaces and your POST_ID exists. Another thing you should look out for is is the length of your music and video should generally be longer that it would generally take for you text content to be narrated.

> ⚠️ **This project is under development so things might change!**