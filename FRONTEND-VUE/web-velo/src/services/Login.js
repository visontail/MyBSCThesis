import API from "./API";

export default {
    logIn() {
        return API('http://localhost:4000').post('/login')
    },
    logOut(){
        return API('http://localhost:4000').post('/logout')
    },
}