const amqp = require("amqplib");
require("dotenv").config();
const RABBIT_URL = process.env.RABBIT_URL;

class Producer {
	channel;

	async createChannel() {
		const connection = await amqp.connect(RABBIT_URL);
		this.channel = await connection.createChannel();
	}

	async publishMessage(exchangeName, message) {
		if (!this.channel) {
			await this.createChannel();
		}

		await this.channel.assertExchange(exchangeName, "fanout");

		await this.channel.publish(exchangeName, "", Buffer.from(JSON.stringify(message)));
	}
}

module.exports = Producer;
