const port = process.env.PORT || 4200;
const http = require('http');
const app = require('./app');
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`the server is now listening at port: ${port}`)
})
