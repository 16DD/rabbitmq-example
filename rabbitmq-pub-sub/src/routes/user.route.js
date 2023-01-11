const express = require("express");
const route = express.Router();

const Producer = require("../config/rabbitmq.producer");
const producer = new Producer();

route.get("/register", async (req, res, next) => {
	try {
		await producer.publishMessage("exchangeUser", "register");
		return res.send({ msg: "Register success" });
	} catch (error) {
		next(error);
	}
});

route.get("/login", async (req, res, next) => {
	try {
		await producer.publishMessage("exchangeUser", "login");
		return res.send({ msg: "Login success" });
	} catch (error) {
		next(error);
	}
});

module.exports = route;
