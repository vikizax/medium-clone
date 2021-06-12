import React, { useEffect } from 'react';

import ArticleCard from '../article-card/article-card.component';


const ArticleList = ({ data }) => {
    return (
        <React.Fragment>
            {
                data ?
                    data.map(article => (
                        <ArticleCard
                            author={article.author.firstName + " " + article.author.lastName}
                            title={article.title}
                            subTitle={article.subTitle}
                            displayImage={article.displayImage}
                            time={article.time}
                            key={article._id}
                            id={article._id}
                        />
                    )) : ''
            }
        </React.Fragment>
    )
};


export default ArticleList;