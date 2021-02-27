const http = require('http')
const ejs = require('ejs');
const fs = require('fs-extra');
var clone = require('git-clone-sync');
const modules = JSON.parse(fs.readFileSync('modules/modules.json'))
console.log('starting wgytcraft website server')
const version = "0.1-alpha"
for (var i = 0; i < 2; i++) {
	// import modules from github
	for (module of modules.moduleList) {
	  if (module.startsWith("gh://")) {
	    url=module.replace("gh://", "git://github.com/")
	    url=`${url}.git`
	  }else if(module.startsWith("gl://")) {
	    url=module.replace("gl://", "git://gitlab.com/")
	    url=`${url}.git`
		}else if(module.startsWith("bb://")){
		  f=module.split("/")
			url=`https://${f[2]}@bitbucket.org/${module.replace("bb://", "")}`
		}else if(module.startsWith("local://")){
			url=""
		}
		directory = `${__dirname}/modules/${module}`
		clone(url, directory.replace("gh://","").replace("bb://", "").replace("gl://",""), { shallow: true }, function() { })
	};
}
// set up error handler
const error = require(`${__dirname}/modules/${modules.errorHandler}/index.js`)
// serve website
function servesite(host, res, req, error, modules) {
	if (modules.website.includes(host) === true) {
		module = modules.websiteData[host]
		Sitemodule = require(`${__dirname}/modules/${module}/index.js`)
		Sitemodule(host, res, req, error, version, ejs)
	} else {
		error(host, res, req, 501, 'Not Implemented. This Site Doesn\'t exist.', version, ejs)
	}
}
http.createServer((req, res) => {
	host = req.headers.host
  servesite(host, res, req, error, modules, version, ejs)
}).listen(3000);