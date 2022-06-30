
import store from '@/store';
import cookie from 'vue-cookies';

const baseURL = store.state.baseURL;

const downloadFile = async ({ type }) => {
    try {
        const response = await fetch(`${baseURL}/parser/download/${type}`, {
            method: 'GET',
            headers: {
                Authorization: `token ${cookie.get('auth_token')}`
            }
        });
        if (response.ok){
            const fileData = await response.blob();
            return fileData;
        }
        const { message } = await response.json();
        return Promise.reject({message, status: response.status });
    } catch (error) {
        throw new Error(error);
    }
};

export { downloadFile };
