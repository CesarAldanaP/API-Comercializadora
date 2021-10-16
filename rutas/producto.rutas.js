module.exports = (app) => {
    var productos = require('../controladores/producto.controlador');

    //metodo que obtiene un producto
    app.get("/productos/:id", productos.obtener);

    //metodo que obtiene la lista de productos
    app.get("/productos", productos.listar);

    //metodo que actualiza (INSERT - UPDATE) un producto
    app.post("/productos", productos.actualizar);

    //metodo que elimina un producto
    app.delete("/productos/:id", productos.eliminar);

}