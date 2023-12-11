const http = require('http');
const fs = require('fs'); // file system module
/*
    req : 방문 요청인 셈
        요청자에 대한 정보가 담겨있다고 보면 됨
    res : 내가 할 응답의 정보를 res 에 담을 수 있다.
*/
const server = http.createServer((req, res) => { // 사용자가 접속하면 이 콜백이 시행됨
    console.log('server execute');
    fs.readFile('./server2.html', (err, data) => { // 파일에서 읽은 것이 data 라는 버퍼에 들어감
        if (err) {
            throw err;
        }
        res.end(data);
    });
}).listen(8080, () => { // listen 이 서버 프로그램이 죽지 않도록 한다.
    console.log("waiting on 8080 port");
});

server.on('listening', () => {
    console.log('waiting on 8080 port');
});
server.on('error', (err) => {
    console.error(err);
});