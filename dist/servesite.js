exports.main = function(host, res, req, error, modules, version, eta) {
  if (modules.website.includes(host) === true) {
    module = modules.websiteData[host];
    Sitemodule = require(`${dirname}/modules/${module}/index.js`);
    Sitemodule(host, res, req, error, version, eta);
  } else {
    error(
      host,
      res,
      req,
      501,
      "Not Implemented. This Site Doesn't exist.",
      version,
      eta
    );
  }
}