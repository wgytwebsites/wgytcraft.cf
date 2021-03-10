# Wgytcraft tests
## How to test a module
- edit modules/modules.json to test different modules
- run test.js and go to http://localhost:3000
- look for the correct things
## test a release
- get the release
- make modules/modules.json 
```json
{
	"version":"1.1.0-beta",
	"moduleList":[ 
		"gh://wgytcraft/errors",
		"gh://wgytcraft/hello-world-template"
	],
	"errorHandler":{
    "module":"wgytcraft/errors",
    "config":{}
  },
	"website":["test.wgyt.tk"],
	"websiteData":{
		"test.wgyt.tk":{
      "module":"wgytcraft/hello-world-template",
      "config":{}
	  }
  }
}
```
replacing test.wgyt.tk with the domain you are testing on
- run test.js  and go to http://localhost:3000
- look for the correct things
- publish