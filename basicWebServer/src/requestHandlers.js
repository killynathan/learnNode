import querystring from 'querystring';
import fs from 'fs';
import formidable from 'formidable';

export const start = (res, req) => {
  console.log("Request handler for 'start' was called");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="file" name="upload" multiple="multiple">' +
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(body);
    res.end();
};

export const upload = (res, req) => {
  console.log("Request handler for 'upload' was called");
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    fs.rename(files.upload.path, "./tmp/test.jpg", (err) => {
      if (err) {
        console.log(err);
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write("<h1>failed to get image</h1>");
        res.end();
      } else {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write("received image:<br/>");
        res.write("<img src='/show' />");
        res.end();
      }
    });

  });
};

export const show = (res, req) => {
  console.log("Request handler for 'show' was called");
  fs.readFile("./tmp/test.jpg", "binary", (err, file) => {
    if (err) {
      res.writeHead(500, {"Content-Type": "text/plain"});
      res.write(err + "\n");
      res.end();
    } else {
      res.writeHead(200, {"Content-Type": "image/jpg"});
      res.write(file, "binary");
      res.end();
    }
  });
};
