var fs = require("fs");

fs.writeFile("./two.txt", "2", function(err) {
	fs.readFile("./two.txt", "utf8", function(err, data) {
		console.log(data);
	})
})
