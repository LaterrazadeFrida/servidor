const Estado = require('../models/Estado');

exports.obtenerEstados = async (req, res) => {
    try {
        const estados = await Estado.find({});
        res.json({ estados });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}