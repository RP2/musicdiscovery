import axios from 'axios'

class userModels {
    static login(username, password){
        let request = axios.post(`http://localhost:4000/api/users/login`,
            {
                username:username,
                password:password,
            }
        )
    return request;
    }
    static signup(username, password){
        let request = axios.post(`http://localhost:4000/api/users/signup`,
            {
                username:username,
                password:password,
            }
        )
    return request
    }
}


export default userModels