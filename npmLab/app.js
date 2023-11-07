const express = require("express");
const path = require('path');

const app = express();
app.set("port", process.env.PORT || 3000);

app.use((req, res, next) => {
	morgan('dev')(req, res, next);
});

app.use((req, res, next) => {
	console.log("express for all request");
	next();
});
app.get('/', (req, res, next) => {
	console.log("only GET request");
	next();
}, (req, res) => {
	throw new Error("error go to error Mid way");
});
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).send(err.message);
});
app.get('/', (req, res) => {
	// res.send("Hello, Express");
	res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(app.get("port"), () => {
	console.log(app.get("port"), "waiting");
});
