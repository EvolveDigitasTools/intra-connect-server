"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const connection_1 = __importDefault(require("./db/connection"));
const routes_1 = __importDefault(require("./routes/routes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
connection_1.default.sync().then(() => {
    console.log("Database synced successfully");
});
const allowedOrigins = ['https://intra-connect.globalplugin.com', 'http://localhost:3000'];
const options = {
    origin: allowedOrigins
};
app.use((0, cors_1.default)(options));
app.use(upload.any());
app.use('/api', routes_1.default);
app.get("*", (req, res) => {
    res.status(400).send("Page not found");
});
app.listen(port, () => {
    console.log(`server is starting on port ${port}`);
});
