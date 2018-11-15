import axios from "axios";
import {sharedComponentData} from'react-simplified';
import React from 'react';

axios.interceptors.response.use(response => response.data);

class ServerLink {

    getArticles() {
        return axios.get('/article');
    }

    getUserByID(id) {
        return axios.get(`/users/id/${id}`);
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

    getArticleById(id) {
        return axios.get(`/article/id/${id}`);
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

    getArticlesImportant() {
        return axios.get(`/article/important`);
    }

    getCommentsByArticleID(id) {
        return axios.get(`/comments/${id}`);
    }

    postComment({comment, user_fk_comment, article_fk}) {
        return axios.post(`/comments`, {comment, user_fk_comment, article_fk});
    }


}

export const serverLink = sharedComponentData(new ServerLink());
