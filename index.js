const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const app = express();
const Git = require("nodegit");
modules = JSON.parse(fs.readFileSync('modules/modules.json'))
app.set("view engine", "ejs");
app.set("view options", { layout: true });
const version = "0.1-alpha"
for (module of modules.moduleList) {
Git.Clone(`https://github.com/wgytcraft/${module}`, `./modules/${module}`).then(function(repository) {
});}
const error = require(`${__dirname}/modules/${modules.errorHandler}/index.js`)
function servesite(host, res, req, error, sites) {
	if (sites.includes(host) === true) {
		res.send('this is WIP') // comment this out
		// servepage(host,res,req)
	} else {
		error(host, res, req, 501, 'Not Implemented. This Site Doesn\'t exist.', version, ejs)
	}
}
app.get('*', (req, res) => {
	host = req.get('host')
	servesite(host, res, req, error, process.env.sites)
});
app.listen(3000, () => {
	console.log('server started');
});