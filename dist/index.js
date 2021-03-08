exports.main = function (modules, dirname, port) {
    var importmodules = require("./importmodules.js").main; // this is the function that imports the modules
    var servesite = require("./servesite.js").main; // this is the function that uses the modules to serve the site
    var fs = require("fs-extra"); // deal with files
    var http = require("http"); // http server
    var ejs = require("ejs"); // templating engine
    var clone = require("git-clone-sync"); // clone from git sources
    var version = "1.0.3"; // verison number
    importmodules(modules, dirname, clone); // import the modules
    var error = require(dirname + "/modules/" + modules.errorHandler + "/index.js"); // get the error handler
    http.createServer(function (req, res) {
        var host = req.headers.host; // this is the host
        res.setHeader("X-Powered-By", "nodejs@wgytcraft/hosting");
        servesite(host, res, req, error, modules, version, ejs); // serve the site
    }).listen(port); // listen on port
};
//# sourceMappingURL=index.js.map