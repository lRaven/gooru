import axios from 'axios';
import store from '@/store'

const baseURL = store.state.baseURL;



const registration = async ({ email, username, password }) => {
    try {
        const response = await axios.post(`${baseURL}/auth/users/`, {
            email,
            username,
            password,
        });
        return response;
        
    } catch (error) {
        throw new Error(error);
    }
}

const login = async ({ username, password }) => {
    try {
        const response = await axios.post(`${baseURL}/auth/token/login/`, {
            username,
            password,
        });
        return response;
    } catch (error) {
        throw  new Error(error);
    }
}

export { registration, login };
