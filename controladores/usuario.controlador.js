//Cargar el modelo de los usuarios
var Usuario = require('../modelos/usuario.modelo');

//Metodo web para obtener un unuario
exports.obtener = (req, res) => {
    Usuario.obtener(req.params.id, (err, data) => {
        //Verificar si hubo error
        if (err) {
            if (err.tipo == "No encontrado") {
                res.status(404).send({ message: `No se encontró usuario con el id ${req.params.id}` });
            }
            else {
                res.status(500).send({ message: `Error obteniendo el usuario con el id ${req.params.id}` });
            }
        }
        else {
            //Se devuelve el registro obtenido
            res.header('Access-Control-Allow-Origin', '*');
            res.send(data);
        }
    });
}

//Metodo web para obtener la lista de usuarios
exports.listar = (req, res) => {
    Usuario.listar((err, data) => {
        //Verificar si hubo error
        if (err) {
            res.status(500).send({ message: 'Error obteniendo la lista de usuarios' });
        }
        else {
            //Se devuelve los registros obtenidos
            res.header('Access-Control-Allow-Origin', '*');
            res.send(data);
        }
    });
}

//Metodo web para obtener un usuario
exports.actualizar = (req, res) => {
    //validar que la solicitud tenga datos
    if (!req.body) {
        res.status(400).send({ message: 'El contenido del mensaje debe tener información con el usuario' });
    }

    Usuario.actualizar(new Usuario(req.body),
        (err, data) => {
            //Verificar si hubo error
            if (err) {
                if (err.tipo == "No encontrado") {
                    res.status(404).send({ message: 'No se actualizó ningún usuario' });
                }
                else {
                    res.status(500).send({ message: 'Error actualizando el usuario' });
                }
            }
            else {
                //Se devuelve el registro actualizado
                res.header('Access-Control-Allow-Origin', '*');
                res.send(data);
            }
        });
}

//Metodo web para eliminar un usuario
exports.eliminar = (req, res) => {
    Usuario.eliminar(req.params.id,
        (err, data) => {
            //Verificar si hubo error
            if (err) {
                if (err.tipo == "No encontrado") {
                    res.status(404).send({ message: `No se econtró el usuario con id:${req.params.id}` });
                }
                else {
                    res.status(500).send({ message: 'Error eliminando el usuario' });
                }
            }
            else {
                //Se devuelve el registro actualizado
                res.header('Access-Control-Allow-Origin', '*');
                res.send({ message: `El usuario con id:${req.params.id} fue eliminada` });
            }
        });
}