module.exports = (app) => {
    var usuarios = require('../controladores/usuario.controlador');

    //metodo que obtiene un usuario
    app.get("/usuarios/:id", usuarios.obtener);

    //metodo que obtiene la lista de usuarios
    app.get("/usuarios", usuarios.listar);

    //metodo que actualiza (INSERT - UPDATE) un usuario
    app.post("/usuarios", usuarios.actualizar);

    //metodo que elimina un usuario
    app.delete("/usuarios/:id", usuarios.eliminar);

}