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

    getComments(id) {
        return axios.get(`/comments/${id}`);
    }

    getUserByEmail(email) {
        return axios.get(`/users/${email}`);
    }

    getArticleDetails(id) {
        return axios.get(`/article/${id}`);
    }

}

export const serverLink = sharedComponentData(new ServerLink());