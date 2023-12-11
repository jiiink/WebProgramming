const express = require('express');

const app = express();

// app.js 가 서버의 핵심인 셈이다.

app.get('/', (req, res) => { // get 요청을 받는 라우터
    res.send('Hello express');
});

app.get('/users', (req, res) => { //  이런 라우터들을 조립한다 생각하면 됨. 라우터들을 app 에 연결한다.
    res.send('Hello users');
});

app.post('/', (req, res) => {

});

app.delete('/', (req, res) => {

});

module.exports = app;