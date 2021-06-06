import React from 'react';
import ArticleCard from '../article-card/article-card.component';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

const ArticleList = () => {
    return (
        <React.Fragment>
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
        </React.Fragment>
    )
};


export default ArticleList;