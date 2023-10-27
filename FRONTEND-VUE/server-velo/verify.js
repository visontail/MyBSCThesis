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


/* 

// Middleware to verify access tokens
const verifyAccessToken = (req, res, next) => {
  const accessToken = req.body.token;
  if (accessToken == null) return res.sendStatus(401);
  jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      // Access token is expired or invalid
      // You can generate a new access token here and send it in the response
      const newAccessToken = generateAccessToken({ name: user.name });
      res.json({ accessToken: newAccessToken });
    } else {
      // Access token is valid; continue with the request
      req.user = user;
      next();
    }
  });
}; */