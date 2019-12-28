import axios from "axios";

export const generatePlaylist = async (
  access_token,
  spotify_uid,
  artist_list,
  event_name
) => {
  return axios.post("/api/spotify/generate_playlist", {
    access_token,
    spotify_uid,
    artist_list,
    event_name
  });
};

export const getArtistsYouFollow = (identifiers = []) => {
  return axios.post("/api/spotify/get_matching_followed_artists", {
    identifiers
  });
};
