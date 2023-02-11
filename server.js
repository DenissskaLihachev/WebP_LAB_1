const http = require("http");
const fs = require("fs");
http.createServer(function (request, response) {
    console.log(`Запрошенный адрес: ${request.url}`);
    const filePath = request.url.substr(1) // получаем путь 

    response.setHeader("Content-Type", "text/html; charset=utf-8;");
    if (request.url == "/") {
        response.statusCode = 301; // временная переадресация
        response.setHeader("Location", "/index.html");
        response.end();
    }
    else {
        fs.readFile(filePath, function (error, data) {
            if (error) {
                response.statusCode = 404;
                response.end("Resourse not found!");
            }
            else {
                let message = "Изучаем Node.js";
                let header = "Главная страница";
                data = data.toString(); // преобразовывает в строку
                data = data.replace("{header}", request.url.substr(1))
                    .replace("{menu}", message);
                response.end(data);
            }
        });
    }


}).listen(3000, function () {
    console.log("Server started at 3000");
});
