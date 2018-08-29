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
}


export default userModels