import React from 'react';
import { useQuery } from 'react-query';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// import { useRecoilValue } from 'recoil';
// import { getArticles } from '../../global/global.state';
import { getArticles } from '../../global/action';
import ArticleList from '../../components/article-list/article-list.component';
import ArticleListLoading from '../../components/article-list/article-list-loading.component';


const useStyle = makeStyles((theme) => ({
    foot: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        }
    },
    footLink: {
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(4)
    }
}));

const HomePage = () => {
    const classes = useStyle();
    const { data, isLoading, error } = useQuery('articlesQ', getArticles);
    return (
        <Container maxWidth='md'>
            <Grid container>
                <Grid item xs={12} md={8} >
                    {
                        isLoading && (<ArticleListLoading />)
                    }
                    {
                        error && (<div>{error}</div>)
                    }
                    <ArticleList data={data} />
                </Grid>
                <Grid item md={4} className={classes.foot}>
                    <Typography className={classes.footLink} color='textSecondary'>
                        MERN Medium Clone Project {"</>"}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}

export default HomePage;