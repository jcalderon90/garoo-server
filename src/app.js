import express from "express";
import morgan from "morgan";
import cookie_parser from "cookie-parser";
import cors from 'cors';

//routers
import auth_routes from "./routes/auth.routes.js";
import user_routes from "./routes/user.routes.js";



// Crear una instancia de express
const app = express();

app.use(cors({

    origin: 'http://localhost:5175',
    // origin: '*',
    credentials: true, // ¡Importante!

}));

// Configurar morgan para mostrar los registros de las solicitudes en el formato 'dev'
app.use(morgan('dev'));

// Configurar el middleware para parsear solicitudes JSON
app.use(express.json());

app.use(cookie_parser());




// Configurar las rutas de autenticación de usuarios con el prefijo '/auth'
app.use('/auth', auth_routes);
// Configurar las rutas de autenticación de usuarios con el prefijo '/user'
app.use('/user', user_routes);

app.get('/', (req, res) => {

    res.send('GAROO SERVICES');

});

export default app;
