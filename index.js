const express = require('express');
const ejs = require('ejs');
const app = express();
app.set("view engine", "ejs");
app.set("view options", { layout: true } );
const version = "0.1-alpha"
function error(host,res,req,errornumber,errordesc,version,ejs){
	res.status(errornumber);
	date = Date.now() * 1000
	date2 = new Date(date)
	date3 = date2.toLocaleString("en-US", {timeZoneName: "short",timeZone: "America/New_York"})
	console.log(`${errornumber} ${errordesc} error @ https://${host}${req.url}`)
	ejs.renderFile('modules/errors/index.ejs', {errornumber: errornumber,errordesc:errordesc,url:`https://${host}${req.url}`,host:host||wgytcraft,timestamp:date3,version:version}, {}, function (err, template) { if (err) { throw err; } else { res.end(template); } }); 
}
function servesite(host,res,req,error,sites){
	if (sites.includes(host)===true){
		res.send('this is WIP') // comment this out
		// servepage(host,res,req)
	}else{
		error(host,res,req,501,'Not Implemented. This Site Doesn\'t exist.',version,ejs)
	}
}
app.get('*', (req, res) => {
	host = req.get('host')
	servesite(host,res,req,error,process.env.sites)
});
app.listen(3000, () => {
  console.log('server started');
});