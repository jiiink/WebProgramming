const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

    // 2 seconds later
let question = "웹프로그래밍";
setTimeout(() => {
    console.log(question);
    rl.on("line", (answer) => {
        clearTimeout(timer); // Clear the timeout
        rl.close();
        result(question, answer);
    });
}, 2000);

const timer = setTimeout(() => { // 5 seconds later
    console.log("시간 초과");
    rl.close();
}, 7000); 
      

function result(q, a) {
    if (q === a) {
        console.log("성공");
    } else {
        console.log("실패");
    }
}
