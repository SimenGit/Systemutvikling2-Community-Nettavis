import axios from "axios";
import {sharedComponentData} from'react-simplified';
import React from 'react';

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

    getArticleDetails(header) {
        return axios.get(`/article/${header}`);
    }

    registerUser({email,password,name,age}) {
        return axios.post(`/users/`, {email,password,name,age});
    }
    getCategories() {
        return axios.get(`/categories/`);
    }

    postArticle(formData, config) {
        return axios.post(`/article/`, formData, config);
    }


}

export const serverLink = sharedComponentData(new ServerLink());
