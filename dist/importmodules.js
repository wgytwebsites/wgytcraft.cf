exports.main = function(modules, dirname,clone) {
	for (module of modules.moduleList) {
		let toClone = true
		if (module.startsWith("gh://")) {
			url = module.replace("gh://", "git://github.com/");
			url = `${url}.git`;
		} else if (module.startsWith("gl://")) {
			url = module.replace("gl://", "git://gitlab.com/");
			url = `${url}.git`;
		} else if (module.startsWith("bb://")) {
			f = module.split("/");
			url = `https://${f[2]}@bitbucket.org/${module.replace("bb://", "")}`;
		} else if (module.startsWith("local://")) {
			let toClone = false
			url = "";
		} else if (module.startsWith("npm://")) {
			let toClone = false
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
		if (toClone) {
			console.log('Cloning: ' + module)
			clone(
				url,
				directory.replace("gh://", "").replace("bb://", "").replace("gl://", ""),
				{ shallow: true },
				function() { }
			);
		}
	}
}