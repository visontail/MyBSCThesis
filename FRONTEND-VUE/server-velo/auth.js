import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

import { verifyToken } from "./verify.js";

//  import queries
import { getUsers, postUsers, getStationsTable } from "./database.js";

dotenv.config({ path: "../../.env" });

//  using express.js framework
const app = express();
const port = process.env.AUTH_SERVER_PORT;

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const refreshTokens = [];

// AUTHENTICATE
app.use(bodyParser.json());

app.get("/users", async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

app.post("/user", async (req, res) => {
  try {
    const hasedPass = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hasedPass };
    await postUsers(user.name, user.password);
    res.status(201).send("User created!");
  } catch {
    res.status(500).send();
  }
});

app.post("/login", async (req, res) => {
  const users = await getUsers();
  const user = users.find((user) => user.UserName == req.body.name);
  if (user == undefined) {
    return res.status(401).json({
      error: "Invaild credentials",
      message: "Better luck next time"
    });
  }
  try {
    if (await bcrypt.compare(req.body.password, user.Password)) {
      const username = req.body.UserName;
      const user = { name: username };
      const accessToken = generateAccessToken(user);
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN);
      refreshTokens.push(refreshToken)
      res.set(
        {
        'Authorization': accessToken,
        'Refresh': refreshToken
        }
      );
      res.json(
        {
        accessToken: accessToken,
        refreshToken: refreshToken
        }
      );
    } else {
      res.status(402).json({
        error: "Invaild credentials",
        message: "Better luck next time"
      });
    }
  } catch {
    res.status(500).send();
  }
});

app.post('/token', async (req, res) => {
    const refreshToken = req.header('Refresh')
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
        if(err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })
})

app.delete('/logout', (req, res) => {
  const refreshToken = req.header('Refresh');
  if (!refreshToken) {
    return res.sendStatus(401); // Unauthorized if token is not provided
  }
  const index = refreshTokens.indexOf(refreshToken);
  if (index === -1) {
    return res.sendStatus(403); // Forbidden if token is not found in the array
  }
  refreshTokens.splice(index, 1); // Remove the token from the refreshTokens array
  res.status(200).send("Successful logout");
});


function generateAccessToken(user) {
  console.log('new access token was generated');
  return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "1 min" }); // 10-15 min later
}

// GET 'Stations' DB table content
app.post("/stations", verifyToken, async (req, res) => {
// code here
});

//  Listening Port
app.listen(port, () => {
  console.log(`Server is running.`);
});
//  Welcome Page
app.get("/", (req, res) => {
  res.status(200).json({
    title: "Welcome to WebVelo's Authentication API",
    port: `Server is running on port: ${port}`,
  });
});
//  Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
