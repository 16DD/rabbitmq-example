const express = require("express");
const route = express.Router();

const Producer = require("../config/rabbitmq.producer");
const producer = new Producer();

route.get("/register", async (req, res, next) => {
	try {
		await producer.sendMessage("user", "register");
		return res.send({ msg: "Register success" });
	} catch (error) {
		next(error);
	}
});

route.get("/login", async (req, res, next) => {
	try {
		await producer.sendMessage("user", "login");
		return res.send({ msg: "Login success" });
	} catch (error) {
		next(error);
	}
});

module.exports = route;
