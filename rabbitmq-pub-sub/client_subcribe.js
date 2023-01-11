const Consumer = require("./src/config/rabbitmq.consumer");

const consumer = new Consumer();

consumer.subMessages("exchangeUser");
