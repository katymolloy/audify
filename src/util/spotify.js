import { json } from "react-router-dom";

const clientId = "f2ad0261134a43ffb4338718bc196907"; // Our spotify API ID
const redirectUri = "http://localhost:3000/home"; // must whitelist the redirects through the Spotify Developer Dashboard
let accessToken = "";
let selectedAlbumId = ""; // Variable to store the selected album ID
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
    getAlbumInfo(selectedAlbumId) {
        const token = Spotify.getAccessToken();

        return fetch(`https://api.spotify.com/v1/albums/${selectedAlbumId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(jsonResponse => {
                if (!jsonResponse) {
                    return null;
                }


                const albumInfo = {
                    cover: jsonResponse.images[0].url,
                    url: jsonResponse.external_urls.spotify,
                    title: jsonResponse.name,
                    artist: jsonResponse.artists[0].name,
                    tracks: jsonResponse.tracks.items.map(track => ({
                        name: track.name,
                        duration: track.duration_ms,
                    })),
                }
                console.log(jsonResponse);

                return jsonResponse; // Return jsonResponse
            });
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
                return jsonResponse.albums.items.map(newAlbum => ({
                    id: newAlbum.id,
                    name: newAlbum.name,
                    artist: newAlbum.artists[0].name,
                    cover: newAlbum.images[0].url,
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
                return jsonResponse.items.map(userAlbum => ({
                    id: userAlbum.album.id,
                    name: userAlbum.album.name,
                    artist: userAlbum.album.artists[0].name,
                    cover: userAlbum.album.images[0].url,
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
    //https://developer.spotify.com/documentation/web-api/reference/search search query, limit 50, offset 0.
    search(query) {
        // Get access token
        const token = Spotify.getAccessToken();

        // Fetch new releases
        const fetchSeachTerm = fetch(`https://api.spotify.com/v1/search?q=${query}&type=album&limit=50`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(jsonResponse => {
                if (!jsonResponse.albums) {
                    return [];
                }
                return jsonResponse.albums.items.map(newAlbum => ({
                    id: newAlbum.id,
                    name: newAlbum.name,
                    artist: newAlbum.artists[0].name,
                    cover: newAlbum.images[0].url,
                }));
            });
    }
};
export { clientId, redirectUri }

export default Spotify;