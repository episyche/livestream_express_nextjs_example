const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");
const { v4: uuidv4 } = require('uuid');
var fs = require('fs');

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

let port = 3000;

io.on('connection', socket => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });


    socket.on('recordedVideo', (stream) => {
        var filename = uuidv4() + '.webm';
        const path = `/video/${filename}`;
        var fileStream = fs.createWriteStream(__dirname + "/public" + path);
        fileStream.write(stream);
        fileStream.end();
        socket.broadcast.emit('now', path);
    });
    socket.on('stream', (stream) => {
        socket.broadcast.emit('stream', stream);
    })

});



nextApp.prepare().then(() => {
    app.all("*", (req, res) => {
        return nextHandler(req, res);
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log("> Ready on port: " + port);
    });
});
