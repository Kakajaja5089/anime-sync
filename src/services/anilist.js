const axios = require("axios");

async function getAnimeMappings(anilistId) {
    const query = `
        query ($id: Int) {
            Media(id: $id, type: ANIME) {
                id
                title { romaji english native }
                externalLinks { id site url }
            }
        }`;

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
}

module.exports = { getAnimeMappings };
