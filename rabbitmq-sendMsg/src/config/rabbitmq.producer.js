const amqp = require("amqplib");
require("dotenv").config();
const RABBIT_URL = process.env.RABBIT_URL;

class Producer {
	channel;

	async createChannel() {
		const connection = await amqp.connect(RABBIT_URL);
		this.channel = await connection.createChannel();
	}

	async sendMessage(queueName, message) {
		if (!this.channel) {
			await this.createChannel();
		}

		await this.channel.assertQueue(queueName, {
			durable: true,
		});

		await this.channel.sendToQueue(queueName, Buffer.from(message), { persistent: true });
	}
}

module.exports = Producer;
