import User from "../models/user.model.js";
import { CREATE__ACCCESS__TOKEN } from "../libs/jwt.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";




// Función para registrar un nuevo usuario.  Se agregó manejo de errores y se especificó la respuesta JSON.
export const register = async (req, res) => {

    const { username, email, password } = req.body;

    try {

        const user_found = await User.findOne({ email });

        if (user_found)
            return res.status(400).json({ message: "Email is already in use" });

        const password_hash = await bcrypt.hash(password, 10);

        const new_user = new User({

            username,
            email,
            password: password_hash

        });


        //CAPTURANDO EL USUARIO QUE SE ACABA DE GUARDAR EN LA BD
        const user_saved = await new_user.save();

        const user = {
            id: user_saved._id,
            username: user_saved.username,
            email: user_saved.email,
            role: user_saved.role,
            imgURL: user_saved.imgURL,
            created_at: user_saved.createdAt,
            updated_at: user_saved.updatedAt
        };



        const token = await CREATE__ACCCESS__TOKEN({ id: user_saved.id });

        res.status(200).json({ message: "User successfully created.", token, user });

    }
    catch (error) {

        res.status(500).json({ message: error.message });

    }

};


// Función para iniciar sesión de un usuario. Se agregó manejo de errores y se especificó la respuesta JSON.
export const login = async (req, res) => {

    const { email, password } = req.body;


    try {

        const user_found = await User.findOne({ email });

        if (!user_found) return res.status(400).json({ message: "User not found" });

        const is_match = await bcrypt.compare(password, user_found.password);

        if (!is_match) return res.status(400).json({ message: "Incorrect password" });


        const user = {
            id: user_found._id,
            username: user_found.username,
            email: user_found.email,
            role: user_found.role,
            imgURL: user_found.imgURL,
            created_at: user_found.createdAt,
            updated_at: user_found.updatedAt
        };


        const token = await CREATE__ACCCESS__TOKEN({ id: user_found._id });

        res.status(200).json({ message: "User successfully logged in.", token, user });

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }

};


// Función para cerrar sesión de un usuario.
export const logout = (req, res) => {

    res.cookie('token', "", {
        expires: new Date(0)
    });

    return res.sendStatus(200);
};


// Función para obtener el perfil de un usuario. Se agregó manejo de errores y se especificó la respuesta JSON.
export const profile = async (req, res) => {

    const user_found = await User.findById(req.user.id);

    if (!user_found) return res.status(400).json({ message: "User not Found" });

    return res.json({ // Se devuelve una respuesta JSON con los datos del usuario

        id: user_found._id,
        username: user_found.username,
        email: user_found.email,
        role: user_found.role,
        imgURL: user_found.imgURL,
        createdAt: user_found.createdAt,
        updatedAt: user_found.updatedAt,

    });

};



export const verifyToken = async (req, res) => {
    try {
        const authHeader = req.header('Authorization');

        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }

        // Extraer el token del formato "Bearer token"
        const token = authHeader.startsWith('Bearer ')
            ? authHeader.slice(7)
            : authHeader;

        if (!token) {
            return res.status(401).json({ message: "Invalid token format" });
        }

        jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                console.error('Token verification error:', err);
                return res.status(401).json({ message: "Invalid or expired token" });
            }

            const user_found = await User.findById(decoded.id);

            if (!user_found) {
                return res.status(401).json({ message: "User not found" });
            }

            return res.json({
                id: user_found._id,
                username: user_found.username,
                email: user_found.email,
                role: user_found.role,
                imgURL: user_found.imgURL,
                created_at: user_found.createdAt,
                updated_at: user_found.updatedAt
            });
        });

    } catch (error) {
        console.error('Verify token error:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};