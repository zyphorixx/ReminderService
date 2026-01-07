const amqplib = require('amqplib');
const { MESSAGE_BROKER_URL, EXCHANGE_NAME } = require('../config/serverConfig');

let channel;

const createChannel = async () => {
    try {
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        channel = await connection.createChannel();

        await channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true });

        return channel;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const subscribeMessage = async (binding_key) => {

    const q = await channel.assertQueue('BOOKING_QUEUE', {
        durable: true
    });

    await channel.bindQueue(q.queue, EXCHANGE_NAME, binding_key);

    channel.consume(q.queue, (msg) => {
        if (msg) {
            console.log('Received data:', msg.content.toString());

            channel.ack(msg);
        }
    });
};

const publishMessage = async (channel, binding_key, message) => {
    try {
        channel.publish(
            EXCHANGE_NAME,
            binding_key,
            Buffer.from(JSON.stringify(message))
        );
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createChannel,
    subscribeMessage,
    publishMessage
};