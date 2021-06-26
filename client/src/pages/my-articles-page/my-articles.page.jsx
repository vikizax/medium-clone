import React from 'react';
import { useQuery } from 'react-query';
import { makeStyles } from '@material-ui/core';
import ArticleList from '../../components/article-list/article-list.component';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ArticleListLoading from '../../components/article-list/article-list-loading.component';
import { getUserArticles } from '../../global/action';;

const useStyles = makeStyles({
    title: {
        marginTop: 20
    }
});

const MyArticlesPage = () => {

    const classes = useStyles();

    const { data, isLoading, isError, error, isSuccess } = useQuery('myArticleQ', getUserArticles)

    if (isError) {
        return (<div>{error.response.statusText}</div>);
    }

    return (
        <Container maxWidth='sm'>

            <Typography variant='subtitle1' className={classes.title}>
                My Stories
            </Typography>
            <Divider />
            {
                isLoading && (<ArticleListLoading />)
            }
            {
                isSuccess ?
                    data.length ?
                        (<ArticleList data={data} isLoading={isLoading} />) :
                        'Nothings here.' : 'Nothings here.'
            }
        </Container>
    );
}

export default MyArticlesPage;