const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const sendBasicEmail = require('./services/email-services');

const cron = require('node-cron');

const setupAndStartServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));

    app.listen(3004, () => {
        console.log(`Server started on port ${PORT}`);

        // sendBasicEmail(
        //     'support@admin.com',
        //     'itsrajsingh56@gmail.com',
        //     'This is a testing email',
        //     'Hey, how are you, I hope you like the support'
        // );

        cron.schedule('* * * * *', () => {
           console.log('Runs every minute');
        });
    });
}

setupAndStartServer();
