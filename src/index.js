import 'dotenv/config';

import app from "./app.js";
import { connect_db } from "./db.js";




// Conectar a la base de datos
connect_db();




// Escuchar solicitudes en el puerto especificado
const PORT = process.env.PORT ?? 3000;

const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

app.listen(PORT, HOST, () => {
    // Mostrar mensaje de servidor en ejecución
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode`);
    console.log(`Server listening on port http://${HOST}:${PORT}`);
});
