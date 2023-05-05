import jwt, { verify } from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if(!token) {
            return res.status(403).send({ message: "Access Denied" });
        }

        if(token.startsWith("Bearer ")) {
            token = token.slice(7, token.length),trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next(); //Sends it to the next function, the next function of this middleware is register in index.js
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}; 