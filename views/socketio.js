console.log("socketio.js");

let socket = io();

let urlParams = new URLSearchParams(window.location.search);
let urlSinParams = location.href.split("?")[0];

let shot = urlParams.get("shot");
if (shot == "true") {
        socket.emit("Tomar pantallazo", urlSinParams, "google");
}