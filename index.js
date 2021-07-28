'use script'

const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//crea servidor
const app = express();


//Conectar la base de datos
conectarDB();

app.use(cors());

//habilitar express.json
app.use(express.json({ extended: true }));



//importar rutas
//Ruting
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/servicios', require('./routes/servicios'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/empleados', require('./routes/empleados'));
app.use('/api/roles' , require('./routes/roles'));
app.use('/api/validacion' , require('./routes/contrasena'));
app.use('/api/respuestas' , require('./routes/respuestas'));
app.use('/api/contrasena' , require('./routes/contrasena'));
app.use('/api/validacion-cliente' , require('./routes/agendamiento'));
app.use('/api/agendar-cita' , require('./routes/agendamiento'));
app.use('/api/consultar-agendamiento', require('./routes/consultasAgendamiento'));
app.use('/api/estados', require('./routes/estados'));
app.use('/api/citas', require('./routes/citas'));
app.use('/api/tipos-servicios', require('./routes/tipoServicios'));
app.use('/api/reportes', require('./routes/reportes'));
app.use('/api/reporte-edades', require('./routes/reporteEdad')) ;
app.use('/api/reporte-productos', require('./routes/reporteProductos')) ;
app.use('/api/puntos', require('./routes/puntos')) ;
app.use('/api/insumos', require('./routes/insumos')) ;



//puerto de la app
const port = process.env.PORT || 7009
app.listen(port, '0.0.0.0', () => console.log(`Server running on port: ${port}`))
