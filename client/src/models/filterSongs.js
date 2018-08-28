import axios from "axios";

class songFilter {
  static filter(genre) {
    let genreObj = genre.genre;
    let request = axios.get(`http://localhost:4000/api/playlist/songs/${genreObj}`);
    console.log(genre)
    return request;
  }
}

export default songFilter;