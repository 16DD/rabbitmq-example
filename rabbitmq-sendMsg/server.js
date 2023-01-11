const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const RouteUser = require("./src/routes/user.route");
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/users", RouteUser);

app.use((err, req, res, next) => {
	let error = {
		message: err.message,
		code: err.code,
		name: err.name,
		status: err.status,
	};

	return res.status(500).json(error);
});

app.use("*", (req, res) => {
	return res.status(400).json({ error: "Invalid URL." });
});

app.listen(PORT, () => {
	console.log(`Listening on port http://localhost:${PORT}`);
});
