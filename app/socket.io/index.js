module.exports = function (app_pack) {
    let { io, mongo } = app_pack;

    io.on('connection', function (socket) {

        socket.on('Productos: Cargar todos', async function () {
            let productos = await mongo.todosLosDatosAlmacenados("Productos");
            io.to(socket.id).emit("Productos: Cargar todos", productos);
        });

        socket.on('Productos: Cargar uno', async function (id) {
            let producto = await mongo.leer(id, "Productos");
            io.to(socket.id).emit("Productos: Cargar uno", producto);
        });

        socket.on('Productos: Eliminar', async function (id) {
            let producto = await mongo.eliminar(id, "Productos");
            io.to(socket.id).emit("Productos: Eliminar", producto);
        });

        socket.on('Producto: obtener', async function (id) {
            let producto = await mongo.leer(id, "Productos");
            io.to(socket.id).emit("Producto: consultado", producto);
        });
        
    });
}