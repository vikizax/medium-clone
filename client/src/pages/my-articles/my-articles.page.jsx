import React from 'react';
import { useRecoilValue } from 'recoil';
import Box from 'material-ui/core/Box';
import ArticleList from '../../components/article-list/article-list.component';
import { getUserArticles } from '../../global/global.state';

const MyArticlesPage = () => {
    const result = useRecoilValue(getUserArticles);
    const data = result.respone.data;
    render(
        <Box p={3}>
            <ArticleList data={data} />
        </Box>
    );
}

export default MyArticlesPage;