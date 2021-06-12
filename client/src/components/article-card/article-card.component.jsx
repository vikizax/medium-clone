import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const useStyles = makeStyles({
    root: {
        margin: 10
    },
    cardContent: {
        width: '100%'
    },
    user: {
        fontSize: 10,
    },
    subTitle: {
        marginBottom: 12,
    },
    time: {
        fontSize: 10,
    },
    grow: {
        width: '20%',
    },
    cardMedia: {
        height: 100,
        width: '100%',
        objectFit: 'cover',
        border: '2 solid black'
    }
});

const ArticleCard = ({ isLoading, author, title, subTitle, displayImage, time, id }) => {
    const classes = useStyles();
    const history = useHistory();
    const redirect = () => {
        history.push(`/article/${id}`);
    }
    return (
        <Card elevation={0} className={classes.root} onClick={redirect}>
            <Box display='flex' flexDirection='row' alignItems="center" p={2} >
                <CardContent className={classes.cardContent}>
                    {
                        isLoading ? (
                            <React.Fragment>
                                <Skeleton width='40%' />
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                                <Skeleton width='40%' />
                            </React.Fragment>

                        ) : (
                            <React.Fragment>
                                <Typography className={classes.user} color="textSecondary" gutterBottom>
                                    {author}
                                </Typography>
                                <Typography variant="h5" component="b">
                                    {title}
                                </Typography>
                                <Typography className={classes.subTitle} color="textSecondary">
                                    {subTitle}
                                </Typography>
                                <Typography className={classes.time} color="textSecondary">
                                    {moment(time).format('MMMM Do YYYY')}
                                </Typography>
                            </React.Fragment>
                        )
                    }
                </CardContent>
                <div className={classes.grow} />
                {
                    isLoading ? (
                        <Skeleton variant='rect' width={200} height={100} />
                    ) : (
                        <CardMedia
                            className={classes.cardMedia}
                            image={displayImage}
                            title='Display Image'
                        />
                    )
                }
            </Box>
        </Card>
    )
};

export default ArticleCard;