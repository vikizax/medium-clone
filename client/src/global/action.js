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

export const getArticles = async (_, credentials) => {
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

export const publishArticle = async (
    {
        time,
        title,
        subTitle,
        displayImage,
        blocks,
        author,
        articleToUpdate
    }) => {

    let response;

    if (articleToUpdate) {
        response = await axios.patch(
            api.article + '/' + articleToUpdate,
            { time, title, subTitle, displayImage, blocks, author },
            { withCredentials: true });
    } else {
        response = await axios.post(
            api.article,
            { time, title, subTitle, displayImage, blocks, author },
            { withCredentials: true });
    }
    return response.data.result;

}