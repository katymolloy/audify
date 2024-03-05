const clientId = "f2ad0261134a43ffb4338718bc196907"; // Our spotify API ID
const redirectUri = "http://localhost:3000/home"; // must whitelist the redirects through the Spotify Developer Dashboard
let accessToken = "";

// Will have to create a search bar in order to test this, however using the documentation this should be correct without testing
const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            // This clears the parameters, allowing us to grab a new access token
            // when it expires
            window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
            window.history.pushState("Access Token", null, "/");
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },
    // This will take a search string and fetch albums from that name
    home() {
        const token = Spotify.getAccessToken();
        // search documentation found here: https://developer.spotify.com/documentation/web-api/reference/search
        return fetch(`https://api.spotify.com/v1/browse/new-releases`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                console.log(response.json);
                return response.json();
            })
            .then((jsonResponse) => {
                if (!jsonResponse.albums) {
                    return [];
                }

                return jsonResponse.albums.items.map((album) => ({
                    id: album.id,
                    name: album.name,
                    spotify: album.external_urls.spotify, //Open with spotify link
                    cover: album.images[0].url,
                }));
            });
    },
};
export { clientId, redirectUri }

export default Spotify;