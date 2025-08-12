import mongoose from "mongoose";



/**
 * Función para conectar a la base de datos MongoDB.
 * Se conecta a la base de datos 'test_db' en el host 'localhost:27017'.
 * Imprime un mensaje de confirmación si la conexión es exitosa, 
 * o un mensaje de error si falla la conexión.
 */

// export const connect_db = async () => {
//     try {

//         const db = await mongoose.connect('mongodb://localhost:27017/test_db');
//         console.log('Conectado a la base de datos:', db.connection.name.toUpperCase());

//     }
//     catch (error) {

//         console.error('Error al conectar a la base de datos:', error);

//     }
// };






export async function connect_db() {

    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error("La variable de entorno MONGODB_URI no está definida. Por favor, crea un archivo .env con la URI de conexión a MongoDB Atlas.");
        }

        console.log('🔄 Intentando conectar a MongoDB...');
        // Conectar sin opciones deprecadas
        const db = await mongoose.connect(uri);

        console.log("\x1b[32m%s\x1b[0m", "CONECTADO A LA BASE DE DATOS:", db.connection.name.toUpperCase());

    } catch (error) {
        console.error("\x1b[31m%s\x1b[0m", "Error al conectar a la base de datos:", error.message);

        if (error.message.includes('IP')) {
            console.log("\x1b[33m%s\x1b[0m", "💡 Solución: Autoriza tu IP en MongoDB Atlas Network Access");
        }

        // En desarrollo, no terminar el proceso para permitir reconexión
        if (process.env.NODE_ENV !== 'production') {
            console.log("\x1b[33m%s\x1b[0m", "🔄 El servidor continuará ejecutándose. Corrige la conexión y reinicia.");
            return;
        }

        process.exit(1);
    }
}