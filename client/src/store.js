import axios from "axios";
import {sharedComponentData} from'react-simplified';
axios.interceptors.response.use(response => response.data);

class ServerLink {

    getArticles() {
        return axios.get('/article');
    }

    getUser(id) {
        return axios.get(`/users/${id}`);
    }

}

export const serverLink = sharedComponentData(new ServerLink());