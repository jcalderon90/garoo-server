# Garoo Server

Servidor backend para la aplicación Garoo.

## Requisitos Previos

- Node.js 16 o superior
- npm o yarn
- MongoDB Atlas (para producción) o MongoDB local para desarrollo
- Cuenta en [Render](https://render.com/)

## Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
MONGODB_URI=tu_cadena_de_conexion_mongodb
PORT=3000
```

## Instalación

1. Clona el repositorio
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Desarrollo

Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

## Producción

Para iniciar el servidor en producción:

```bash
npm start
```

## Despliegue en Render

1. Crea una nueva cuenta en [Render](https://render.com/) si aún no tienes una.
2. Haz clic en "New" y selecciona "Web Service".
3. Conecta tu repositorio de GitHub/GitLab o sube tu código directamente.
4. Configura el servicio:
   - **Name**: garoo-server (o el nombre que prefieras)
   - **Region**: Selecciona la más cercana a tu ubicación
   - **Branch**: main (o la rama que desees desplegar)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. En la sección de variables de entorno, agrega:
   - `NODE_ENV`: production
   - `MONGODB_URI`: Tu cadena de conexión de MongoDB Atlas
6. Haz clic en "Create Web Service"

## Variables de Entorno en Producción

Asegúrate de configurar las siguientes variables de entorno en el panel de Render:

- `NODE_ENV`: production
- `MONGODB_URI`: Tu cadena de conexión de MongoDB Atlas
- `PORT`: Render lo configurará automáticamente, no necesitas establecerlo manualmente

## Base de Datos

Este proyecto utiliza MongoDB. Para producción, se recomienda usar MongoDB Atlas.

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Crea un nuevo clúster gratuito
3. Crea un usuario de base de datos
4. Configura las reglas de red para permitir conexiones desde cualquier IP (0.0.0.0/0) o solo desde la IP de Render
5. Obtén la cadena de conexión y configúrala en las variables de entorno

## Soporte

Si encuentras algún problema, por favor abre un issue en el repositorio.