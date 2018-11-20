// @flow

import axios from 'axios';
import { sharedComponentData } from 'react-simplified';
import React from 'react';

axios.interceptors.response.use(response => response.data);

class Article {
  id: number = 0;
  header: string = '';
  description: string = '';
  content: string = '';
  date_made: Date = new Date();
  img: string = '';
  importance: boolean = false;
  category_fk: number = 0;
  user_fk: number = 0;
}

class User {
  id: number = 0;
  name: string = '';
  age: number = 0;
  email: string = '';
  password: string = '';
}

class ArticleStore {
  currentArticle: Article = new Article();
  articles: Article[] = [];
  newsfeed: Article[] = [];

    getArticles() {
        return axios.get('/article');
    }

    patchArticle(oldHeader:string, p: { header: string, description: string, content: string, importance: boolean }) {
        return axios.patch(`/article/${oldHeader}`, { header: p.header, description: p.description, content: p.content, importance: p.importance });
    }

    getByHeader(header: string) {
        return axios.get(`/article/header/${header}`);
    }

    getArticleDetails(header: string) {
        return axios.get(`/article/${header}`);
    }

    getArticleById(id: number) {
        return axios.get(`/article/id/${id}`).then((articles: Article)=> {
            // $FlowFixMe
            this.currentArticle = articles[0];
            // $FlowFixMe
            return articles[0].user_fk;
        });
    }

    // $FlowFixMe
    postArticle(formData, config) {
        return axios.post(`/article/`, formData, config);
    }

    deleteArticle(header: string) {
        return axios.delete(`/article/${header}`);
    }

    getArticlesImportant() {
        return axios.get(`/article/important`).then((articles: Article[])=> this.articles = articles);
    }

    getArticleByCategory(category: string) {
        return axios.get(`/article/category/${category}`);
    }
    getArticlesNewsFeed() {
        return axios.get(`/article/newsfeed`).then((newsfeed: Article[]) => this.newsfeed = newsfeed);
    }

}

class UserStore{
  currentUser: User = new User();

    getUserByID(id: number) {
        return axios.get(`/users/id/${id}`);
    }
    getUserByEmail(email: string) {
        return axios.get(`/users/${email}`).then((users: User[]) => (this.currentUser = users[0]));
    }
    getUserByEmail2(email: string) {
        return axios.get(`/users/${email}`);
    }
    registerUser(p:{ email: string, password: string, name: string, age: number }) {
        return axios.post(`/users/`, { email: p.email, password: p.password, name: p.name, age: p.age });
    }
    logout() {
        this.currentUser = new User();
    }

}

class CommentStore {

    getComments(id: number) {
        return axios.get(`/comments/${id}`);
    }

    getCommentsByArticleID(id: number) {
        return axios.get(`/comments/${id}`);
    }
    deleteComments(article_fk: number) {
        return axios.delete(`/comments/${article_fk}`);
    }

    postComment(p: { comment: string, user_fk_comment: number, article_fk: number }) {
        return axios.post(`/comments/`, { comment: p.comment, user_fk_comment: p.user_fk_comment, article_fk: p.article_fk });
    }

}

class RatingStore {

    getLikes(article_id: number) {
        return axios.get(`/rating/likes/${article_id}`);
    }

    getDislikes(article_id: number) {
        return axios.get(`/rating/dislikes/${article_id}`);
    }

    postRating(p:{ rating: boolean, user_fk: number, article_fk: number }) {
        return axios.post(`/rating/`, { rating: p.rating, user_fk: p.user_fk, article_fk: p.article_fk });
    }

    deleteRating(article_fk: number) {
        return axios.delete(`/rating/${article_fk}`);
    }

    checkUserRating(user_fk: number, article_fk: number) {
        return axios.get('checkUsers/check', { user_fk: user_fk, article_fk: article_fk });
    }

    getLikes(article_id: number) {
        return axios.get(`/rating/likes/${article_id}`);
    }

    getDislikes(article_id: number) {
        return axios.get(`/rating/dislikes/${article_id}`);
    }
}

export const articleStore = sharedComponentData(new ArticleStore());
export const userStore = sharedComponentData(new UserStore());
export const commentStore = sharedComponentData(new CommentStore());
export const ratingStore = sharedComponentData(new RatingStore());

