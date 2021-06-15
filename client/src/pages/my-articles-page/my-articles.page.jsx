import React from 'react';
import { useRecoilValue } from 'recoil';
import ArticleList from '../../components/article-list/article-list.component';
import { getUserArticles } from '../../global/global.state';
import Container from '@material-ui/core/Container';

const MyArticlesPage = () => {
    const response = useRecoilValue(getUserArticles);
    const data =  response.data.result;
    
    return (
        <Container maxWidth='sm'>

            <ArticleList data={data} />

        </Container>
    );
}

export default MyArticlesPage;