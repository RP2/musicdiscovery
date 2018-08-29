import axios from "axios";

class songFilter {
  static filter(genre) {
    let genreObj = genre.genre;
    genreObj = genreObj.charAt(0).toUpperCase() + genreObj.substring(1).toLowerCase();
    let request = axios.get(`http://localhost:4000/api/playlist/songs/${genreObj}`);
    console.log(genreObj)
    return request;
  }
}

export default songFilter;