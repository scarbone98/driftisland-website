import axios from "axios";
import {domainURL} from "./variables";

export function getArticle(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`${domainURL}/articles/getArticle?id=${id}`);
            resolve(response.data);
        } catch (e) {
            reject(e);
        }
    });
}

export function getArticles() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`${domainURL}/articles/getArticles`);
            resolve(response.data);
        } catch (e) {
            reject(e);
        }
    });
}

export function getNumArticles() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`${domainURL}/articles/getArticles?number=true`);
            resolve(response.data);
        } catch (e) {
            reject(e);
        }
    });
}

export function uploadArticle(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(`${domainURL}/articles/createArticle`, data);
            resolve(response);
        } catch (e) {
            reject(e);
        }
    })
}

export function uploadFiles(files, onProgress) {
    return new Promise(async (resolve, reject) => {
        try {
            const fileNames = await axios.post(
                `${domainURL}/articles/upload`,
                files,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: onProgress
                });
            resolve(fileNames);
        } catch (e) {
            reject(e);
        }
    })
}