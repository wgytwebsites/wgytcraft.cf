// modules and dirname should be set here in regular version, but not in npm version
dirname = __dirname;
const fs = require("fs-extra");
const modules = JSON.parse(fs.readFileSync("modules/modules.json"));
const http = require("http");
const ejs = require("ejs");
var clone = require("git-clone-sync");
console.log("starting wgytcraft website server");
const version = "1.0.2";
  // import modules
  for (module of modules.moduleList) {
    let toClone = true
    if (module.startsWith("gh://")) {
      url = module.replace("gh://", "git://github.com/");
      url = `${url}.git`;
    } else if (module.startsWith("gl://")) {
      url = module.replace("gl://", "git://gitlab.com/");
      url = `${url}.git`;
    } else if (module.startsWith("bb://")) {
      f = module.split("/");
      url = `https://${f[2]}@bitbucket.org/${module.replace("bb://", "")}`;
    } else if (module.startsWith("local://")) {
			let toClone = false
      url = "";
    } else if (module.startsWith("npm://")) {
      let toClone = false
      fs.rmdirSync(
        `${dirname}/modules/${module.replace("@", "").replace("npm://", "")}`, {recursive: true}
      );
      console.log(`${dirname}/modules/${module.replace("@", "").replace("npm://", "")}`)
      fs.copySync(
        `${dirname}/node_modules/${module.replace("npm://", "")}`,
        `${dirname}/modules/${module.replace("@", "").replace("npm://", "")}`
      );
      url = "";
    }
    directory = `${dirname}/modules/${module}`;
    if (toClone) {
      console.log('Cloning: ' + module)
    clone(
      url,
      directory.replace("gh://", "").replace("bb://", "").replace("gl://", ""),
      { shallow: true },
      function () {}
    );
    }
  }

// set up error handler
const error = require(`${dirname}/modules/${modules.errorHandler}/index.js`);
// serve website
function servesite(host, res, req, error, modules) {
  if (modules.website.includes(host) === true) {
    module = modules.websiteData[host];
    console.log(module)
    console.log('Hi ')
    // Why does this never log
		// it doesn't log because odules.website.includes(host) isn't true
    // OH
    Sitemodule = require(`${dirname}/modules/${module}/index.js`);
    Sitemodule(host, res, req, error, version, ejs);
  } else {
    error(
      host,
      res,
      req,
      501,
      "Not Implemented. This Site Doesn't exist.",
      version,
      ejs
    );
  }
}
http.createServer((req, res) => {
    host = req.headers.host;
    console.log(host)
    servesite(host, res, req, error, modules, version, ejs);
}).listen(3000);
