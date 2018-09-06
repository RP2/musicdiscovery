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

    static approve(song_id){
        console.log(song_id)
        let request = axios.put(`http://localhost:4000/api/songs/pending/${song_id}`,
        {
            status: true,
        }
    )
        return request
    }

    static delete(song_id){
        console.log(song_id)
        let request = axios.delete(`http://localhost:4000/api/songs/pending/${song_id}`)
        return request
    }
}


export default userModels