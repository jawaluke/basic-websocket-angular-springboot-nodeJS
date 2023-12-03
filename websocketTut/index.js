const express = require('express');
const app = express();

// websocket
const {WebSocketServer} = require('ws');
const socket = new WebSocketServer({port:441});

socket.on("connection", ws => {
    console.log("new client connected ",ws.listenerCount);

    ws.on("message",data => {
        console.log("server received data: ",data.toString());
    });

    app.get('/send/:message', (req, res) => {
        ws.send(req.params['message']);
        res.status(200).send("message sented: "+req.params['message']);
    })

    ws.on("close", () => {
        console.log("connection closed - ",ws.url);
    })
    
});


app.get('/info', (req, res) => {
    res.status(200).send("websocket learning");
})

app.listen(8090, () => {
    console.log("started listening on port 8080");
})