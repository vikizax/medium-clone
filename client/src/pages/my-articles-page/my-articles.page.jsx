import React from 'react';
import { useQuery } from 'react-query';
import ArticleList from '../../components/article-list/article-list.component';
import Container from '@material-ui/core/Container';
import { getUserArticles } from '../../global/action';

const MyArticlesPage = () => {

    const { data, isLoading, isError, error } = useQuery('myArticleQ', getUserArticles)

    if (isLoading) {
        return (<div>Loading!</div>);
    }

    if (isError) {
        return (<div>{error.response.statusText}</div>);
    }

    return (
        <Container maxWidth='sm'>
            <ArticleList data={data} />
        </Container>
    );
}

export default MyArticlesPage;