
const Cita = require('../models/Cita');
const Usuario = require('../models/Usuario');

exports.generarConsultaEdades = async (req, res) => {
    const { fechaInicio, fechaFinal } = req.body;
    let documentos = [];
    var infantil = 0;
    var joven = 0;
    var adultoJoven = 0;
    var adulto = 0;
    var mayor = 0;

    try {

        let citas = await Cita.find({
            $expr: {
                $and: [
                    { $gte: [{ $year: "$horaInicio" }, { $year: new Date(fechaInicio) }] },
                    { $gte: [{ $month: "$horaInicio" }, { $month: new Date(fechaInicio) }] },
                    { $gte: [{ $dayOfMonth: "$horaInicio" }, { $dayOfMonth: new Date(fechaInicio) }] },
                    { $lte: [{ $year: "$horaInicio" }, { $year: new Date(fechaFinal) }] },
                    { $lte: [{ $month: "$horaInicio" }, { $month: new Date(fechaFinal) }] },
                    { $lte: [{ $dayOfMonth: "$horaInicio" }, { $dayOfMonth: new Date(fechaFinal) }] }
                ]
            }
        });

        let cumplidas = citas.filter(cita => cita.Estado == 'Cumplida');

        if (cumplidas.length === 0) {
            return res.status(400).json({ msg: 'NO SE ENCONTRARON DATOS' });
        }

        cumplidas.map((cita) => {
            documentos.push(cita.docCliente);
        });

        for (i in documentos) {
            documento = documentos[i];

            let usuario = await Usuario.findOne({ documento });

            let hoy = new Date();
            let dateString = usuario.fecha;
            let fechaNacimiento = new Date(dateString);

            let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

            let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
            if (
                diferenciaMeses < 0 ||
                (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
            ) {
                edad--
            }

            if (edad < 10 && edad > 0) {
                infantil = infantil + 1;
            }
            else {
                if (edad >= 10 && edad < 18) {
                    joven = joven + 1;
                }
                else {
                    if (edad >= 18 && edad <= 35) {
                        adultoJoven = adultoJoven + 1;
                    }
                    else {
                        if (edad > 35 && edad < 65) {
                            adulto = adulto + 1;
                        }
                        else {
                            mayor = mayor + 1;
                        }
                    }
                }
            }
        }

        let estadisticas = [
            {
                categoria: "Infantil",
                cantidad: infantil
            },
            {
                categoria: "Joven",
                cantidad: joven
            },
            {
                categoria: "Adulto Joven",
                cantidad: adultoJoven
            },
            {
                categoria: "Adulto",
                cantidad: adulto
            },
            {
                categoria: "Mayor",
                cantidad: mayor
            }
        ]
         
        sortJSON(estadisticas,'cantidad','desc');

        function sortJSON(data, key, orden) {
            return data.sort(function (a, b) {
                var x = a[key],
                y = b[key];
        
                if (orden === 'desc') {
                    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                }
            });
        }
        res.json(estadisticas);
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }


}