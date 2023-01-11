const amqp = require("amqplib");
require("dotenv").config();
const RABBIT_URL = process.env.RABBIT_URL;

class Consumer {
	channel;

	async createChannel() {
		const connection = await amqp.connect(RABBIT_URL);
		this.channel = await connection.createChannel();
	}

	async subMessages(nameExchange) {
		if (!this.channel) {
			await this.createChannel();
		}

		await this.channel.assertExchange(nameExchange, "fanout");

		const q = await this.channel.assertQueue("", {
			exclusive: true,
		});

		await this.channel.bindQueue(q.queue, nameExchange, "");

		await this.channel.consume(
			q.queue,
			(msg) => {
				const data = JSON.parse(msg.content);
				console.log(`Msg:::::: ${data}`);
			},
			{
				noAck: true,
			}
		);
	}
}

module.exports = Consumer;
