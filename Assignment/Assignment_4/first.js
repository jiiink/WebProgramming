const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

    // 2 seconds later
let question = "Web";
setTimeout(() => {
    console.log(question);
    rl.on("line", (answer) => {
        clearTimeout(timer); // Clear the timeout
        rl.close();
        result(question, answer);
    });
}, 2000);

const timer = setTimeout(() => { // 5 seconds later
    console.log("Time's up! You didn't input anything.");
    rl.close();
}, 7000); 
      

function result(q, a) {
    if (q === a) {
        console.log("Correct");
    } else {
        console.log("Wrong");
    }
}
