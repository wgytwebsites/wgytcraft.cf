const express = require('express');
const ejs = require('ejs');
const app = express();
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("view options", { layout: true } );
const version = "0.1-alpha"
function error(host,res,req,errornumber,errordesc,version){
	res.status(errornumber);
	date = Date.now() * 1000
	date2 = new Date(date)
	date3 = date2.toLocaleString("en-US", {timeZoneName: "short"})
	console.log(`${errornumber} ${errordesc} error @ https://${host}${req.url}`)
	res.render(`all/error`,{errornumber: errornumber,errordesc:errordesc,url:`https://${host}${req.url}`,host:host||wgytdomains,timestamp:date3,version:version});
}
function servePage(host,res,req,error,sites){
	if (sites.includes(host)===true){
		res.send('this is WIP')
	}else{
		error(host,res,req,501,'Not Implemented. This Site Doesn\'t exist.',version)
	}
}
app.get('*', (req, res) => {
	host = req.get('host')
	servePage(host,res,req,error,process.env.sites)
});
app.listen(3000, () => {
  console.log('server started');
});