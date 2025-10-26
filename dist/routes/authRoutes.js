"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const router = (0, express_1.Router)();
router.post("/github", async (req, res) => {
    const { code } = req.body;
    try {
        const tokenResponse = await axios_1.default.post("https://github.com/login/oauth/access_token", {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
        }, { headers: { Accept: "application/json" } });
        const access_token = tokenResponse.data.access_token;
        const { data: user } = await axios_1.default.get("https://api.github.com/user", {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        res.json({
            token: access_token,
            user: {
                name: user.name || user.login,
                email: user.email,
                avatar: user.avatar_url,
                provider: "github",
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "GitHub auth failed" });
    }
});
exports.default = router;
