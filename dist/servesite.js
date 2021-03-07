exports.main = function(host, res, req, error, modules, version, ejs) {
  if (modules.website.includes(host) === true) {
    module = modules.websiteData[host];
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