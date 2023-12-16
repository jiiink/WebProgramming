#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const type = process.argv[2];
const name = process.argv[3];
const directory = process.argv[4] || '.';

const htmlTemplate = `<!DOCTYPE html>
<html>
<head>
    <meta chart="utf-8" />
    <title>Template</title>
</head>
<body>
    <h1>Hello</h1>
    <p>CLI</p>
</body>
</html>`;

const routerTemplate = `const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    try {
        res.send('ok');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;`;

const makeTemplate = () => {
    mkdirp(directory);
    if (type === 'html') {
        const pathToFile = path.join(directory, `${name}.html`);
        if (exist(pathToFile)) {
            console.error('already exist file');
        } else {
            fs.writeFileSync(pathToFile, htmlTemplate);
            console.log(pathToFile, 'created!');
        }
    } else if (type === 'express-router') {
        const pathToFile = path.join(directory, `${name}.js`);
        if (exist(pathToFile)) {
            console.error('already exist file');
        } else {
            fs.writeFileSync(pathToFile, routerTemplate);
            console.log(pathToFile, 'created!');
        }
    } else {
        console.error('enter html or express-router');
    }
};

const program = () => {
    if (!type || !name) {
        console.error('usage: cli html|express-router filename [create path]');
    } else {
        makeTemplate();
    }
};
program();