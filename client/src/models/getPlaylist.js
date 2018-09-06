import axios from "axios";

class getPlaylist {
  static getPlaylist() {
    let request = axios.get("https://ga-md.herokuapp.com/api/playlist/");
    return request;
  }
}

export default getPlaylist;