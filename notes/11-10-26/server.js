import http from "http";
import fs from "fs";

function requestReceived(request, response) {

    console.log("Request received");

    if (request.url === "/") {
        // load index.html as a response
        let fileData = fs.readFileSync("./public/index.html");

        let responseConfig = {
            "Content-Type": "text/html"
        }
        response.writeHead(200, responseConfig);
        response.end(fileData);

    }

    let responseConfig = {
        "Content-Type": "text/plain"
    }
    response.writeHead(200, responseConfig);
    response.end("This is a message from the server");

}

let server = http.createServer(requestReceived);

server.listen(3000);