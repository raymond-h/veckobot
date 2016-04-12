import webshot from 'webshot';
import TelegramBot from 'node-telegram-bot-api';
import stream from 'stream';

const token = '201853302:AAFu5EcPgsba_U2b_QEd0ugZc_kXa5hDXyw';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/what week is it/i, (msg) => {
    console.log(msg);

    webshot('vecka.nu', 'out.png', (err) => {
        bot.sendPhoto(msg.chat.id, 'out.png');
    });
});
