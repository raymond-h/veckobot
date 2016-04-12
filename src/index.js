import webshot from 'webshot';
import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import stream from 'stream';
import url from 'url';

const token = process.env['VECKOBOT_TOKEN'];

const bot = new TelegramBot(token, { polling: true });

bot.onText(/what week is it/i, (msg) => {
    console.log(msg);

    webshot('vecka.nu', 'out.png', (err) => {
        bot.sendPhoto(msg.chat.id, 'out.png');
    });
});

bot.on('inline_query', (req) => {
    console.log(req);

    const photoUrl = url.resolve(process.env['VECKOBOT_BASE_URL'], 'current-week.png');

    bot.answerInlineQuery(req.id, [
        {
            type: 'photo',
            id: 'only',
            photo_url: photoUrl,
            thumb_url: photoUrl
        }
    ]);
});

const app = express();

app.get('/current-week.png', (req, res) => {
    webshot('vecka.nu').pipe(res);
});

app.listen(8000);
