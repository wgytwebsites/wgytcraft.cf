const fs = require('fs-extra');
var test = require('./index.js');
test.main(JSON.parse(fs.readFileSync('modules/modules.json')),__dirname)