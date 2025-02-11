const express = require("express");
const router = express.Router();
const { getAnimeMappings } = require("../services/anilist");

router.get("/", async (req, res) => {
    const { anilist_id } = req.query;
    if (!anilist_id) return res.status(400).json({ error: "Missing anilist_id" });

    try {
        const mappings = await getAnimeMappings(anilist_id);
        res.json(mappings);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch mappings" });
    }
});

module.exports = router;
