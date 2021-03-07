exports.main = function (modules,dirname) {
	const importmodules = require("./importmodules.js").main
	const servesite = require("./servesite.js").main
	const fs = require("fs-extra");
	const http = require("http");
	const ejs = require("ejs");
	var clone = require("git-clone-sync");
	console.log("starting wgytcraft website server");
	const version = "1.0.2";
	importmodules(modules,dirname,clone);
	const error = require(`${dirname}/modules/${modules.errorHandler}/index.js`);
	http.createServer((req, res) => {
			host = req.headers.host;
			servesite(host, res, req, error, modules, version, ejs);
	}).listen(3000);
}