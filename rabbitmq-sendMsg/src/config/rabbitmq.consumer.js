const amqp = require("amqplib");
require("dotenv").config();
const RABBIT_URL = process.env.RABBIT_URL;

class Consumer {
	channel;

	async createChannel() {
		const connection = await amqp.connect(RABBIT_URL);
		this.channel = await connection.createChannel();
	}

	async receiveMessage(queueName, callback) {
		if (!this.channel) {
			await this.createChannel();
		}

		this.channel.assertQueue(queueName, {
			durable: true,
		});

		this.channel.consume(
			queueName,
			function (msg) {
				callback(msg.content.toString());
			},
			{
				noAck: true,
			}
		);
	}
}

module.exports = Consumer;
