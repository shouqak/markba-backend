"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || "https://markba-task-7sij-qtnc0lzuy-shoqs-projects.vercel.app",
    credentials: true,
}));
app.use("/auth", authRoutes_1.default);
app.get("/", (_req, res) => {
    res.send("Welcome to backend");
});
const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
    console.log(`✅ Backend running on http://${PORT}`);
});
