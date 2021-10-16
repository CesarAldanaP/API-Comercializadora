//Cargar la libreria con la conexion a la bd
var sql = require('./bd');

//constructor
var Usuario = function (usuario) {
    this.id = usuario.Id;
    this.nombre = usuario.Nombre;
    this.referencia = usuario.Referencia;
    this.valorUnitario = usuario.ValorUnitario;
    this.idMarca = usuario.IdMarca;
}

//Metodo que obtiene un registro basado en la clave primaria
Usuario.obtener = (idUsuario, resultado) => {
    sql.query(`SELECT * FROM Usuario WHERE Id=${idUsuario};`, (err, res) => {
        //Verificar si hubo error ejecutando la consulta
        if (err) {
            console.log("Error consultando un usuario:", err);
            resultado(err, null);
            return;
        }
        //La consulta devuelve resultados
        if (res.length) {
            console.log("Usuario encontrado :", res[0]);
            resultado(null, res[0]);
            return;
        }
        //No se encontraron registros
        resultado({ tipo: "No encontrado" }, null);
    });
}

//Metodo que obtiene la lista de usuarios
Usuario.listar = (resultado) => {
    sql.query('CALL spListarUsuarios;', (err, res) => {
        //Verificar si hubo error ejecutando la consulta
        if (err) {
            console.log("Error consultando lista de usuarios:", err);
            resultado(err, null);
            return;
        }
        //La consulta devuelve resultados
        console.log("Lista de usuarios encontrados :", res[0]);
        resultado(null, res[0]);
    });
}

//Metodo que obtiene un registro basado en la clave primaria
Usuario.actualizar = (usuario, resultado) => {
    sql.query('CALL spActualizarUsuario(?, ?, ?, ?, ?);', //consulta sql
        [usuario.Id, usuario.nombre, usuario.referencia, usuario.valorUnitario, usuario.idMarca], //parametros
        (err, res) => {
            //Verificar si hubo error ejecutando la consulta
            if (err) {
                console.log("Error actualizando usuario:", err);
                resultado(err, null);
                return;
            }
            //La consulta no afectó registros
            if (res.affectedRows == 0) {
                //No se encontraron registros
                resultado({ tipo: "No encontrado" }, null);
                return;
            }

            console.log("Usuario actualizado:", usuario);
            resultado(null, { usuario });

        });
}

//Metodo que elimina un registro 
Usuario.eliminar = (idUsuario, resultado) => {
    sql.query('DELETE FROM Moneda WHERE Id = ?', idMoneda, (err, res) => {
        //Verificar si hubo error ejecutando la consulta
        if (err) {
            console.log("Error eliminando el usuario:", err);
            resultado(err, null);
            return;
        }
        //La consulta no afectó registros
        if (res.affectedRows == 0) {
            //No se encontraron registros
            resultado({ tipo: "No encontrado" }, null);
            return;
        }

        console.log("Usuario eliminado con id :", idUsuario);
        resultado(null, res);
    });
}


module.exports = Usuario;