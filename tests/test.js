const fs = require('fs-extra');
var wgytcraft = require('../dist/index.js').main
wgytcraft(JSON.parse(fs.readFileSync('modules/modules.json')),__dirname)
