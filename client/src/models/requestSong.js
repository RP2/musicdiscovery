import axios from "axios";

class requestSong {
  static request(song) {
    let request = axios.post("https://ga-md.herokuapp.com/api/playlist/", song);
    return request;
  }
}

export default requestSong;
