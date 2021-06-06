import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import ArticleList from '../../components/article-list/article-list.component';

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

    return (
        <Container maxWidth='md'>
            <Grid container>
                <Grid item xs={12 }sm={8} md={8} >
                    <ArticleList />
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