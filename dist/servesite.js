exports.main = function(host, res, req, error, modules, version, ejs) {
  if (modules.website.includes(host) === true) { // if the site is in modulesjson 
    module = modules.websiteData[host].module;
    config = modules.websiteData[host].config;
    Sitemodule = require(`${dirname}/modules/${module}/index.js`);
    Sitemodule(host, res, req, error, version, ejs, config); // serve the site
  } else { // otherwise throw error
    error(host,res,req,501,"site doesn't exist :(",version,ejs,modules.errorHandler.config);
  }
}