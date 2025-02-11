const express = require("express");
const router = express.Router();
const { getAnilistToken } = require("../services/anilist");

router.get("/anilist", async (req, res) => {
    const { code } = req.query;
    if (!code) return res.status(400).json({ error: "Missing code" });

    try {
        const token = await getAnilistToken(code);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Failed to authenticate" });
    }
});

module.exports = router;
