import { Router } from "express";
import axios from "axios";

const router = Router();

router.post("/github", async (req, res) => {
  const { code } = req.body;

  try {
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: "application/json" } }
    );

    const access_token = tokenResponse.data.access_token;

    const { data: user } = await axios.get("https://api.github.com/user", {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "GitHub auth failed" });
  }
});

export default router;
