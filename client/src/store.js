// @flow

import axios from 'axios';
import { sharedComponentData } from 'react-simplified';
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

  getByHeader(header) {
    return axios.get(`/article/header/${header}`);
  }

  getArticleDetails(header) {
    return axios.get(`/article/${header}`);
  }

  getArticleById(id) {
    return axios.get(`/article/id/${id}`);
  }

  registerUser({ email, password, name, age }) {
    return axios.post(`/users/`, { email, password, name, age });
  }
  getCategories() {
    return axios.get(`/categories/`);
  }

  postArticle(formData, config) {
    return axios.post(`/article/`, formData, config);
  }
  deleteArticle(header) {
    return axios.delete(`/article/${header}`);
  }

  getArticlesImportant() {
    return axios.get(`/article/important`);
  }

  getArticleByCategory(category) {
    return axios.get(`/article/category/${category}`);
  }

  getArticlesNewsFeed() {
    return axios.get(`/article/newsfeed`);
  }

  getCommentsByArticleID(id) {
    return axios.get(`/comments/${id}`);
  }
  deleteComments(article_fk) {
    return axios.delete(`/comments/${article_fk}`);
  }

  postComment({ comment, user_fk_comment, article_fk }) {
    return axios.post(`/comments/`, { comment, user_fk_comment, article_fk });
  }

  getLikes(article_id) {
    return axios.get(`/rating/likes/${article_id}`);
  }

  getDislikes(article_id) {
    return axios.get(`/rating/dislikes/${article_id}`);
  }

  postRating({ rating, user_fk, article_fk }) {
    return axios.post(`/rating/`, { rating: rating, user_fk: user_fk, article_fk: article_fk });
  }

  deleteRating(article_fk) {
    return axios.delete(`/rating/${article_fk}`);
  }

  checkUserRating(user_fk, article_fk) {
    return axios.get('checkUsers/check', { user_fk: user_fk, article_fk: article_fk });
  }

  patchArticle(oldHeader, { header, description, content, importance }) {
    return axios.patch(`/article/${oldHeader}`, { header, description, content, importance });
  }
}

export const serverLink = sharedComponentData(new ServerLink());
