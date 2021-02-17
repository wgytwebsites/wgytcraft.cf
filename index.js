const express = require('express');
const ejs = require('ejs');
const app = express();
function error(host,res,req,errornumber,errordesc){
	res.status(errornumber);
	console.log(`${errornumber} ${errordesc} error @ https://${host}${req.url}`)
	ejs.renderFile( `${__dirname}/views/all/error.html`, {errornumber: errornumber,errordesc:errordesc,url:`https://${host}${req.url}`,host:host||wgytdomains}, function(err, str) { res.send(str) });
}
function servePage(host,res,req,error,sites){
	if (sites.includes(host)===true){
		res.send('this is WIP')
	}else{
		error(host,res,req,501,'Not Implemented <br> This Site Doesn\'t exist.')
	}
}
app.get('*', (req, res) => {
	host = req.get('host')
	servePage(host,res,req,error,process.env.sites)
});
app.listen(3000, () => {
  console.log('server started');
});