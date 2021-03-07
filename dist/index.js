exports.main = function (modules,dirname,port) {
	const importmodules = require("./importmodules.js").main // this is the function that imports the modules
	const servesite = require("./servesite.js").main // this is the function that uses the modules to serve the site
	const fs = require("fs-extra"); // deal with files
	const http = require("http"); // http server
	const ejs = require("ejs"); // templating engine
	var clone = require("git-clone-sync"); // clone from git sources
	const version = "1.0.3"; // verison number
	importmodules(modules,dirname,clone); // import the modules
	const error = require(`${dirname}/modules/${modules.errorHandler}/index.js`); // get the error handler
	http.createServer((req, res) => { // set up the server
			host = req.headers.host; // this is the host
			res.setHeader("X-Powered-By","nodejs@wgytcraft/hosting")
			servesite(host, res, req, error, modules, version, ejs); // serve the site
	}).listen(port); // listen on port
}