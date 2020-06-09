import axios from "axios"

const instance = axios.create({
    baseURL: 'https://react-my-burger-af273.firebaseio.com/'
});

export default instance;