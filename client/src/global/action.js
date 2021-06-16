import axios from 'axios';
import api from '../constant/api.constant';

export const getArticle = async ({ queryKey }, credentials) => {
    const [_key, id] = queryKey;
    let response;

    if (credentials)
        response = await axios.get(api.article + '/' + id, { withCredentials: true });

    response = await axios.get(api.article + '/' + id);
    return response.data.result;
}

export const getArticles = async ({ queryKey }, credentials) => {
    const [_key] = queryKey;
    let response;

    if (credentials)
        response = await axios.get(api.stories, { withCredentials: true });

    response = await axios.get(api.article);
    return response.data.result;
}

export const getUserArticle = (props) => {
    return getArticle(props, true)
}

export const getUserArticles = (props) => {
    return getArticles(props, true)
}