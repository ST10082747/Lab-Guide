import https from "https";
import http from "http";
import fs from "fs";
import posts from "./routes/post.mjs";
import users from "./routes/user.mjs";
import express from "express";
import cors from "cors";

const PORT = 3000;
const app = express();

const options = {
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
}

app.use(cors());
//app.use(express.json());
app.use(express.json({ limit: '50mb' }));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','*');
    res.setHeader('Access-Control-Allow-Methods','*');
    next();
})

// Correct routing
app.use("/post", posts);
app.use("/user", users)

//app.use("/post", posts);
//app.route("/post", posts);
//app.use("/user", posts);
//app.route("/user", posts);

// server corrections
let server = https.createServer(options,app)
console.log(PORT)
server.listen(PORT);