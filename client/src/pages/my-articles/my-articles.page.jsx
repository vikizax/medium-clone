import React from 'react';
import { useRecoilValue } from 'recoil';
import Box from '@material-ui/core/Box';
import ArticleList from '../../components/article-list/article-list.component';
import { getUserArticles } from '../../global/global.state';
import Container from '@material-ui/core/Container';

const MyArticlesPage = () => {
    const result = useRecoilValue(getUserArticles);
    const data = result.data.result;
    return (
        <Container maxWidth='sm'>
            <Box p={3} >
                <ArticleList data={data} />
            </Box>
        </Container>
    );
}

export default MyArticlesPage;