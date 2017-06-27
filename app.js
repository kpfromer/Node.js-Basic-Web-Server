const http = require("http");
const router = require("./router");

const hostname = "localhost";
const port = 3000;

const server = http.createServer((request, response) => {
    if (request.url === "/" && request.method.toLowerCase() === "get"){
        router.home(request, response);
    } else {
        router.user(request, response);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
