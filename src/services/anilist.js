const axios = require("axios");

// Fetch anime mappings using Anilist ID
async function getAnimeMappings(anilistId) {
    const query = `
        query ($id: Int) {
            Media(id: $id, type: ANIME) {
                id
                title {
                    romaji
                    english
                    native
                }
                externalLinks {
                    id
                    site
                    url
                }
            }
        }
    `;

    try {
        const response = await axios.post("https://graphql.anilist.co", {
            query,
            variables: { id: anilistId }
        });

        const data = response.data.data.Media;
        return {
            anilist_id: data.id,
            titles: data.title,
            mappings: data.externalLinks.reduce((acc, link) => {
                acc[link.site.toLowerCase()] = link.id;
                return acc;
            }, {})
        };
    } catch (error) {
        console.error("Error fetching Anilist mappings:", error);
        throw new Error("Failed to fetch Anilist mappings");
    }
}

// Get OAuth Token for Anilist
async function getAnilistToken(code) {
    try {
        const response = await axios.post("https://anilist.co/api/v2/oauth/token", {
            grant_type: "authorization_code",
            client_id: process.env.ANILIST_CLIENT_ID,
            client_secret: process.env.ANILIST_CLIENT_SECRET,
            redirect_uri: process.env.REDIRECT_URI,
            code
        });

        return response.data.access_token;
    } catch (error) {
        console.error("Error fetching Anilist token:", error);
        throw new Error("Failed to authenticate with Anilist");
    }
}

// Fetch User Anime List from Anilist
async function getAnilistUserList(userId) {
    const query = `
        query ($userId: Int) {
            MediaListCollection(userId: $userId, type: ANIME) {
                lists {
                    entries {
                        mediaId
                        status
                        score
                        progress
                    }
                }
            }
        }
    `;

    try {
        const response = await axios.post("https://graphql.anilist.co", {
            query,
            variables: { userId }
        });

        return response.data.data.MediaListCollection.lists.flatMap(l => l.entries);
    } catch (error) {
        console.error("Error fetching Anilist user list:", error);
        throw new Error("Failed to fetch Anilist user list");
    }
}

module.exports = { getAnimeMappings, getAnilistToken, getAnilistUserList };
