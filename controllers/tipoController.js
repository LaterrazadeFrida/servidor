const Tipo= require('../models/Tipo');



exports.obtenerTipos = async (req, res) => {
    try {
        const tipo = await Tipo.find({});
        res.json({ tipo });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}





