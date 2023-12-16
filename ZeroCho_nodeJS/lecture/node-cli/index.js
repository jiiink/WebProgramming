#!/usr/bin/env node
// console.log('Hello CLI', process.argv);

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.clear();
const answerCallback = (answer) => {
    if (answer === 'y') {
        console.log('Thank you!');
        rl.close();
    } else if (answer === 'n') {
        console.log('Sorry');
        rl.close();
    } else {
        console.clear();
        console.log('only y or n');
        rl.question('is example fun? (y/n)', answerCallback);
    }
    // rl.close();
};

rl.question('is example fun? (y/n)', answerCallback);