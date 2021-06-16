import axios from 'axios';
import api from '../constant/api.constant';

export const getArticles = async () => {
    const response = await axios.get(api.article);
    return response.data.result;
}

export const getArticle = async (_, articleID) => {
    console.log(articleID)
    const response = await axios.get(api.article + '/' + articleID);
    return response.data.result;
}