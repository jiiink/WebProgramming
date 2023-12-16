#!/usr/bin/env node
const program = require('commander');
const inquire = require('inquirer');

const {version} = require('./package.json');

program
    .version(version, '-v, --version')
    .usage('[options]');

// profit
program
    .command('revenue <money> <desc>')
    .action(() => {});
// cost
program
    .command('expense <money> <desc>')
    .action(() => {});
// balance
program
    .command('balance')
    .action(() => {});

program.parse(process.argv);