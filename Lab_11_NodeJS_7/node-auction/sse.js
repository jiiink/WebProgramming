const SSE = require('sse');

module.exports = (server) => {
  //Write your code
  const sse = new SSE(server);
  sse.on('connection', (client) => {
    setInterval(() => {
      client.send(Date.now().toString());
    }, 1000);
  });
};
