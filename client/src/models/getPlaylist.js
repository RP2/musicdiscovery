import axios from "axios";

class getPlaylist {
  static getPlaylist() {
    let request = axios.get("http://localhost:4000/api/playlist/");
    return request;
  }
}

export default getPlaylist;