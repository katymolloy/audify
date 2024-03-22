const clientId = "f2ad0261134a43ffb4338718bc196907"; // Our spotify API ID
const redirectUri = "http://localhost:3000/home"; // must whitelist the redirects through the Spotify Developer Dashboard
let accessToken = "";
// search documentation found here: https://developer.spotify.com/documentation/web-api/reference/search
// Will have to create a search bar in order to test this, however using the documentation this should be correct without testing
const Spotify = {

    getAccessToken() {

        //const storedAccessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            // If access token is found in localStorage and forceRefresh is false, return it
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
            //localStorage.setItem('accessToken', accessToken);
            window.history.pushState("Access Token", null, "/");
            return accessToken;
        } else if (!accessToken) {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=user-library-read&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

    // This will take a search string and fetch albums from that name
    home() {
        // Get access token
        const token = Spotify.getAccessToken();

        // Fetch new releases
        const fetchNewReleases = fetch(`https://api.spotify.com/v1/browse/new-releases`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(jsonResponse => {
                if (!jsonResponse.albums) {
                    return [];
                }
                return jsonResponse.albums.items.map((album) => ({
                    id: album.id,
                    name: album.name,
                    //artist: album.artists[0].name,
                    cover: album.images[0].url,
                }));
            });
        // Fetch user's albums
        const fetchUserAlbums = fetch(`https://api.spotify.com/v1/me/albums`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(jsonResponse => {
                if (!jsonResponse.items) {
                    return [];
                }
                return jsonResponse.items.map((album) => ({
                    id: album.id,
                    name: album.name,
                    //artist: album.artists[0].name,
                    cover: album.images[0].url,
                }));
            });

        // Combine both fetch requests
        return Promise.all([fetchNewReleases, fetchUserAlbums])
            .then(([newReleases, userAlbums]) => {
                return {
                    newReleases: newReleases,
                    userAlbums: userAlbums
                };
            });
    },
};
export { clientId, redirectUri }

export default Spotify;