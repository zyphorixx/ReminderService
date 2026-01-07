const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
// const sendBasicEmail = require('./services/email-services');

const TicketController = require('./controllers/ticket-controller');

const jobs = require('./utils/job');

const setupAndStartServer = () => {

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));

    app.post('/api/v1/tickets', TicketController.create);

    app.listen(3004, () => {
        console.log(`Server started on port ${PORT}`);
        jobs();
        // sendBasicEmail(
        //     'support@admin.com',
        //     'itsrajsingh56@gmail.com',
        //     'This is a testing email',
        //     'Hey, how are you, I hope you like the support'
        // );


    });
}

setupAndStartServer();
