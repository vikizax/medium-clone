import React from 'react';
import ArticleCard from '../article-card/article-card.component';

const ArticleListLoading = () => (
    <React.Fragment>
        <ArticleCard isLoading />
        <ArticleCard isLoading />
        <ArticleCard isLoading />
    </React.Fragment>
);

export default ArticleListLoading;