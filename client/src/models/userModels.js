import axios from 'axios'

class userModels {
    static login(email, password){
        let request = axios.post(`http://localhost:4000/api/users/login`,
            {
                email:email,
                password:password,
            }
        )
    return request;
    }
    static signup(email, password){
        let request = axios.post(`http://localhost:4000/api/users/signup`,
            {
                email:email,
                password:password,
            }
        )
    return request
    }

    static profile(userId){
        let request = axios.get(`http://localhost:4000/api/users/${userId}`)
        return request
    }

    static getPlaylist(userId){
        let request = axios.get(`http://localhost:4000/api/users/${userId}/playlist/`)
        return request
    }

    static saveSong(userId, song_id){
        let request = axios.post(`http://localhost:4000/api/users/${userId}/playlist/`,
            {
                _id: song_id,
            }
        )
        return request
    }

    static pending(){
        let request = axios.get("http://localhost:4000/api/songs/pending",
        )
        return request
    }
}


export default userModels