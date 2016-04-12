import webshot from 'webshot';
import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import morgan from 'morgan';
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

    const photoUrl = url.resolve(process.env['VECKOBOT_BASE_URL'], 'current-week.jpg');

    console.log('Photo URL: ', photoUrl);

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

app.use(morgan('common'));

app.get('/current-week.jpg', (req, res) => {
    webshot('vecka.nu', 'out.jpg', (err) => {
        res.sendFile('out.jpg');
    });
});

app.listen(8000);
