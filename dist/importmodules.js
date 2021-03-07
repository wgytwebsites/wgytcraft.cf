exports.main = function(modules, dirname,clone) {
	for (module of modules.moduleList) { // for each module
		let toClone = true // clone by default
		if (module.startsWith("gh://")) { // github stuff
			url = module.replace("gh://", "git://github.com/");
			url = `${url}.git`;
		} else if (module.startsWith("gl://")) { // gitlab stuff
			url = module.replace("gl://", "git://gitlab.com/");
			url = `${url}.git`;
		} else if (module.startsWith("bb://")) { // bitbucket stuff
			f = module.split("/");
			url = `https://${f[2]}@bitbucket.org/${module.replace("bb://", "")}`;
		} else if (module.startsWith("local://")) { // local modules
			let toClone = false // don't clone
			url = "";
		} else if (module.startsWith("npm://")) { // npm modules
			let toClone = false // don't clone
			fs.rmdirSync(
				`${dirname}/modules/${module.replace("@", "").replace("npm://", "")}`, { recursive: true }
			);
			fs.copySync(
				`${dirname}/node_modules/${module.replace("npm://", "")}`,
				`${dirname}/modules/${module.replace("@", "").replace("npm://", "")}`
			);
			url = "";
		}
		directory = `${dirname}/modules/${module}`;
		if (toClone) { // clone it
			clone(
				url,
				directory.replace("gh://", "").replace("bb://", "").replace("gl://", ""),
				{ shallow: true },
				function() { }
			);
		}
	}
}