module.exports = function(host,res,req,errornumber,errordesc,version,ejs){
	res.status(errornumber);
	date = Date.now() * 1000
	date2 = new Date(date)
	date3 = date2.toLocaleString("en-US", {timeZoneName: "short",timeZone: "America/New_York"})
	console.log(`${errornumber} ${errordesc} error @ https://${host}${req.url}`)
	ejs.renderFile('modules/errors/index.ejs', {errornumber: errornumber,errordesc:errordesc,url:`https://${host}${req.url}`,host:host||wgytdomains,timestamp:date3,version:version}, {}, function (err, template) { if (err) { throw err; } else { res.end(template); } }); 
}