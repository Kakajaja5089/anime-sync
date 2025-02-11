const axios = require("axios");

async function syncUserAnimeList(userId) {
    // Fetch from Anilist
    const anilistRes = await axios.post("https://graphql.anilist.co", {
        query: `
        query ($userId: Int) {
            MediaListCollection(userId: $userId, type: ANIME) {
                lists {
                    entries { mediaId status score progress }
                }
            }
        }`,
        variables: { userId }
    });

    const anilistList = anilistRes.data.data.MediaListCollection.lists.flatMap(l => l.entries);

    return { anilist: anilistList };
}

module.exports = { syncUserAnimeList };
