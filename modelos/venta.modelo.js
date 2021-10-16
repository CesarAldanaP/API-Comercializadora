//Cargar la libreria con la conexion a la bd
var sql = require('./bd');

//constructor
var Venta = function (venta) {
    this.id = venta.Id;
    this.nombre = venta.Nombre;
    this.referencia = venta.Referencia;
    this.valorUnitario = venta.ValorUnitario;
    this.idMarca = venta.IdMarca;
}

//Metodo que obtiene un registro basado en la clave primaria
Venta.obtener = (idVenta, resultado) => {
    sql.query(`SELECT * FROM Venta WHERE Id=${idVenta};`, (err, res) => {
        //Verificar si hubo error ejecutando la consulta
        if (err) {
            console.log("Error consultando una venta:", err);
            resultado(err, null);
            return;
        }
        //La consulta devuelve resultados
        if (res.length) {
            console.log("Venta encontrada:", res[0]);
            resultado(null, res[0]);
            return;
        }
        //No se encontraron registros
        resultado({ tipo: "No encontrado" }, null);
    });
}

//Metodo que obtiene la lista de ventas
Venta.listar = (resultado) => {
    sql.query('CALL spListarVentas;', (err, res) => {
        //Verificar si hubo error ejecutando la consulta
        if (err) {
            console.log("Error consultando lista de ventas:", err);
            resultado(err, null);
            return;
        }
        //La consulta devuelve resultados
        console.log("Lista de ventas encontradas:", res[0]);
        resultado(null, res[0]);
    });
}

//Metodo que obtiene un registro basado en la clave primaria
Venta.actualizar = (venta, resultado) => {
    sql.query('CALL spActualizarVenta(?, ?, ?, ?, ?);', //consulta sql
        [venta.Id, venta.nombre, venta.referencia, venta.valorUnitario, venta.idMarca], //parametros
        (err, res) => {
            //Verificar si hubo error ejecutando la consulta
            if (err) {
                console.log("Error actualizando venta:", err);
                resultado(err, null);
                return;
            }
            //La consulta no afectó registros
            if (res.affectedRows == 0) {
                //No se encontraron registros
                resultado({ tipo: "No encontrado" }, null);
                return;
            }

            console.log("Venta actualizada:", venta);
            resultado(null, { venta });

        });
}

//Metodo que elimina un registro 
Venta.eliminar = (idVenta, resultado) => {
    sql.query('DELETE FROM Venta WHERE Id = ?', idVenta, (err, res) => {
        //Verificar si hubo error ejecutando la consulta
        if (err) {
            console.log("Error eliminando la venta:", err);
            resultado(err, null);
            return;
        }
        //La consulta no afectó registros
        if (res.affectedRows == 0) {
            //No se encontraron registros
            resultado({ tipo: "No encontrado" }, null);
            return;
        }

        console.log("Venta eliminada con id :", idVenta);
        resultado(null, res);
    });
}


module.exports = Venta;