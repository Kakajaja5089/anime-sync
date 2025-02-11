const express = require("express");
const router = express.Router();
const { syncUserAnimeList } = require("../services/sync");

router.get("/", async (req, res) => {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: "Missing userId" });

    try {
        const syncData = await syncUserAnimeList(userId);
        res.json(syncData);
    } catch (error) {
        res.status(500).json({ error: "Failed to sync anime lists" });
    }
});

module.exports = router;
