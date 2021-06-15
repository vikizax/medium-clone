import { atom, selector } from 'recoil';
import axios from 'axios';
import api from '../constant/api.constant';

export const articleLoading = atom({
    key: 'articleLoading',
    default: false
});

export const modalAtom = atom({
    key: 'modal',
    default: {
        view: false,
        option: ''
    }
});

export const userAtom = atom({
    key: 'user',
    default: null,
});

export const editorAtom = atom({
    key: 'editor',
    default: null
});

export const alertAtom = atom({
    key: 'alert',
    default: {
        hidden: true,
        message: '',
        severity: 'success'
    }
});

export const getArticles = selector({
    key: 'articles',
    get: async () => {
        try {
            const response = await axios.get(api.article);
            return response;
        } catch (err) {
            return err.response;
        }
    }
});

export const getUserArticles = selector({
    key: 'userArticles',
    get: async () => {
        try {
            const response = await axios.get(api.stories, { withCredentials: true });
            return response;
        } catch (err) {
            return err.response;
        }
    }
});

export const articleFetchIDAtom = atom({
    key: 'articleFetchID',
    default: null
});

export const getArticle = selector({
    key: 'fetchedArticle',
    get: async ({ get }) => {
        try {
            const id = get(articleFetchIDAtom);
            const response = await axios.get(api.article + `/${id}`);
            return response;
        } catch (err) {
            return err.response;
        }

    }
})