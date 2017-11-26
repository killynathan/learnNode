import http from "http";
import url from "url";

export const startServer = (route, handle) => {
  http.createServer((req, res) => {
    let postData = "";
    let pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received");
    route(handle, pathname, res, req);
  }).listen(8888);
  console.log("server started");
};
