import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import User from "../models/user.model.js";





export const auth_required = (req, res, next) => {

    try {

        const authHeader = req.header('Authorization');

        if (!authHeader) return res.status(401).json({ message: "No Token, authorization denied" });

        // Handle both "Bearer token" and plain token formats
        const token = authHeader.startsWith('Bearer ')
            ? authHeader.slice(7)
            : authHeader;

        const { id } = jwt.verify(token, TOKEN_SECRET);

        req.user = { id: id };

        console.log('auth: ', id);

        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid Token" });
    }

};

export const admin_required = async (req, res, next) => {

    try {

        const id = req.user.id;

        const user_found = await User.findById(id);
        console.log('admin: ', user_found);
        if (!user_found)
            return res.status(404).json({ message: "User not Found" });


        if (user_found.role !== 'admin')
            return res.status(401).json({ message: 'User without necessary privileges.' });

        next();

    }
    catch (error) {

        res.status(500).json({ message: error.message });

    }

};
