let videos = require('./Youtube');

module.exports = function (app_pack) {
    let { io, mongo } = app_pack;

    io.on('connection', function (socket) {

        socket.on('Obtener todos los videos', async function () {
            socket.emit('Todos los videos', videos);
        });
    });
}