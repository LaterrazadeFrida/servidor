const Usuario = require("../models/Usuario");
const Roles = require("../models/Role");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    console.log(errores);
    return res.status(400).json({ errores: errores.array() });
  }

  const { documento, contraseña } = req.body;

  try {
    //revisar que el usuario si exista
    let usuario = await Usuario.findOne({ documento });

    if (!usuario) {
      return res.status(400).json({ msg: "EL USUARIO NO EXISTE" });
    }

    //revisar que el password coincida
    const passCorrecto = await bcryptjs.compare(contraseña, usuario.contraseña);

    if (!passCorrecto) {
      return res.status(400).json({ msg: "CONTRASEÑA INCORRECTA" });
    }

    //si todo es correcto
    //crear y guardar jwt
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };

    //firmar el jwt  json web token
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;
        //mensaje de confirmacion
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

//devuelve el usuario autenticado
exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select(
      "-contraseña"
    );
    res.json({ usuario });
  } catch (error) {
    console.log(console.error());
    res.status(500).json({ msg: "hubo un error" });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    let usuario = await Usuario.findById(req.usuario.id);

    const roles = await Roles.findById(usuario.rol);

    if (roles.nombre === "Administrador") {
      next();
      return;
    }

    return res.status(403).json({ message: "Require Permisos de Admin!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};
