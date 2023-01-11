const Consumer = require("./src/config/rabbitmq.consumer");

const consumer = new Consumer();

consumer.receiveMessage("user", (msg) => {
	console.log(`Msg:::::: ${msg}`);
});
