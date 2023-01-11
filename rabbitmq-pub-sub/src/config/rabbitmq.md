const amqp = require("amqplib/callback_api");
require("dotenv").config();
const RABBIT_URL = process.env.RABBIT_URL;

module.exports.connect = () => {
	return new Promise((resolve, reject) => {
		amqp.connect(RABBIT_URL, (err0, conn) => {
			if (err0) {
				reject(err0);
			} else {
				conn.createChannel((err1, channel) => {
					if (err1) {
						reject(err1);
					} else {
						resolve(channel);
					}
				});
			}
		});
	});
};

module.exports.sendMessageToQueue = function (channel, queueName, message) {
	channel.assertQueue(queueName, {
		durable: false,
	});

	channel.sendToQueue(queueName, Buffer.from(message));
};

module.exports.consumeFromQueue = function (channel, queueName, callback) {
	channel.assertQueue(queueName, {
		durable: false,
	});

	channel.consume(
		queueName,
		function (msg) {
			callback(msg.content.toString());
		},
		{
			noAck: true,
		}
	);
};
