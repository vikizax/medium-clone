import React from 'react';
import { useQuery } from 'react-query';
import ArticleList from '../../components/article-list/article-list.component';
import Container from '@material-ui/core/Container';
import ArticleListLoading from '../../components/article-list/article-list-loading.component';
import { getUserArticles } from '../../global/action';;

const MyArticlesPage = () => {

    const { data, isLoading, isError, error, isSuccess } = useQuery('myArticleQ', getUserArticles)

    if (isError) {
        return (<div>{error.response.statusText}</div>);
    }

    return (
        <Container maxWidth='sm'>
            {
                isLoading && (<ArticleListLoading />)
            }
            {
                isSuccess && (<ArticleList data={data} isLoading={isLoading} />)
            }
        </Container>
    );
}

export default MyArticlesPage;