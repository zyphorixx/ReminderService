const cron = require('node-cron');
const emailService = require('../services/email-services');
const sender = require('../config/emailConfig');

const setupJobs = () => {
    cron.schedule('*/1 * * * *', async () => {
        try {
            const response = await emailService.fetchPendingEmails();

            console.log('Pending Tickets Found:', response.length);

            for (const email of response) {
                sender.sendMail(
                    {
                        to: email.recipientEmail,
                        subject: email.subject,
                        text: email.content
                    },
                    async (err, data) => {
                        if (err) {
                            console.log('MAIL ERROR:', err);
                        } else {
                            console.log('MAIL SENT:', data.response);

                            const updatedTicket = await emailService.updateTicket(
                                email.id,
                                { status: 'SUCCESS' }
                            );

                            console.log(
                                'Updated Ticket:',
                                updatedTicket.toJSON()
                            );
                        }
                    }
                );
            }
        } catch (error) {
            console.log('CRON ERROR:', error);
        }
    });
};

module.exports = setupJobs;