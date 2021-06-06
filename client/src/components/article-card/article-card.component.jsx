import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import img from './logo512.png';

const useStyles = makeStyles({
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
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
        flexGrow: 1
    },
    cardMedia: {
        height: 100,
        width: 100,
        objectFit: 'cover'
    },

})

const ArticleCard = () => {
    const classes = useStyles();

    return (
        <Card className={classes.root} elevation={0} >
            <Box display='flex' flexDirection='row' alignItems="center" p={2}>

                <CardContent>
                    <Typography className={classes.user} color="textSecondary" gutterBottom>
                        User-A
                </Typography>
                    <Typography variant="h5" component="h2">
                        This is the Article Heading
                </Typography>
                    <Typography className={classes.subTitle} color="textSecondary">
                        Article brif sub title
                </Typography>
                    <Typography className={classes.time} color="textSecondary">
                        well meaning and kindly.
                </Typography>
                </CardContent>

                <div className={classes.cardMedia} />
                <CardMedia
                    className={classes.cardMedia}
                    image={img}
                    component='img'
                />
            </Box>
        </Card>

    )
};

export default ArticleCard;