import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import Skeleton from '@material-ui/lab/Skeleton';
import { useHistory, useLocation } from 'react-router-dom';
import moment from 'moment';
import { deleteArticle } from '../../global/action';
import { alertAtom } from '../../global/global.state';

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
    const location = useLocation();
    const queryClient = useQueryClient();
    const setAlert = useSetRecoilState(alertAtom);
    const { mutateAsync, isLoading: isMutating, reset } = useMutation(deleteArticle, {
        onSuccess: () => {
            queryClient.invalidateQueries('articleQ');
            queryClient.invalidateQueries('myArticleQ');
            reset();
            setAlert({
                hidden: false,
                message: 'Delete Success.',
                severity: 'success'
            });
        },
        onError: () => {
            reset();
            setAlert({
                hidden: false,
                message: 'Something went wrong. Please try again.',
                severity: 'error'
            });
        }
    });


    const redirect = () => {
        if (location.pathname === '/stories') {
            history.push(`/edit/${id}`);
        }
        else {
            history.push(`/article/${id}`);
        }
    }

    const cardContent = (
        <Box display='flex' flexDirection='row' alignItems="center" p={2} width={'100%'} onClick={redirect}>
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
                            {location.pathname !== '/stories' ?
                                (<Typography className={classes.user} color="textSecondary" gutterBottom>
                                    {author}
                                </Typography>) : ''}
                            <Typography variant="h5" component="b">
                                {title.replaceAll('&nbsp;', ' ')}
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
                ) : displayImage ? (
                    <CardMedia
                        className={classes.cardMedia}
                        image={displayImage.url}
                        title='Display Image'
                    />
                ) : ''
            }
        </Box>
    );

    return (
        <Card elevation={0} className={classes.root} >
            {
                location.pathname === '/stories' ?
                    (<Box display='flex' flexDirection='row' alignItems='center'>
                        {cardContent}
                        
                        <IconButton onClick={async () => await mutateAsync(id)}
                            disabled={isMutating}
                        >
                            {
                                isMutating ? (<CircularProgress />) :
                                    (<DeleteIcon color='error' />)
                            }
                        </IconButton>

                    </Box>) : (cardContent)
            }

        </Card>
    )
};

export default ArticleCard;