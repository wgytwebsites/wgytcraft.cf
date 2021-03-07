# Wgytcraft tests
## How to test a module
- edit modules/modules.json to test different modules
- run test.js and go to http://localhost:3000
- look for the correct things
## test a release
- get the release
- make modules/modules.json ```json
{
	"version":"0.1-alpha",
	"moduleList":[ 
		"gh://wgytcraft/errors",
		"gh://wgytcraft/hello-world-template"
	],
	"errorHandler":"wgytcraft/errors",
	"website":["test.wgyt.tk"],
	"websiteData":{
		"test.wgyt.tk":"wgytcraft/hello-world-template"
	}
}``` replacing test.wgyt.tk with the domain you are testing on
- run test.js  and go to http://localhost:3000
- look for the correct things
- publish