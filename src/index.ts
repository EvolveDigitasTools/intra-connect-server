import './config/config';
import express from "express";
import cors from "cors";
import multer from "multer";

import connection from "./db/connection"

import routes from "./routes/routes";

const app = express();
const port = process.env.PORT || 3000;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

connection.sync().then(() => {
    console.log("Database synced successfully");
});

const allowedOrigins = ['https://intra-connect.globalplugin.com', 'http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options));
app.use(upload.any());

app.use('/api', routes);

app.get("*", (req, res) => {
	res.status(400).send("Page not found");
});
app.listen(port, () => {
	console.log(`server is starting on port ${port}`);
});