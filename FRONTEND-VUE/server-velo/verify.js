import jwt from "jsonwebtoken";

// Middleware function to verify access tokens
export function verifyToken(req, res, next) {
    const accessToken = req.header('Authorization');
    if (!accessToken) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
}