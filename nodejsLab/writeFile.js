var fs = require("fs");

//sync
console.log(1);
var result1 = fs.readFileSync("./two.txt", "utf8");
console.log(result1);
console.log(3);

console.log("--------------------");

//async
console.log(1);
fs.readFile("./two.txt", "utf8", function(err, result) {
	console.log(result);
});
console.log(3);
