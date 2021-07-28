const Role= require('../models/Role');

exports.crearRol = async (req, res) => {
    try {
        //crea el nuevo rol
        let role = new Role(req.body);
        await role.save();
        res.json(role);
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }


}