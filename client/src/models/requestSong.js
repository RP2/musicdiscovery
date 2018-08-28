import axios from "axios";

class requestSong {
  static request(song) {
    let request = axios.post("http://localhost:4000/api/playlist/", song);
    return request;
  }
}

export default requestSong;
