import React, { useState, useEffect } from 'react';
import { useSetRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { editorAtom, modalAtom, userAtom, alertAtom, articleFetchIDAtom } from '../../global/global.state';
import api from '../../constant/api.constant';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    buttonText: {
        fontSize: 12
    },
    button: {
        borderRadius: 20,
        marginLeft: 10
    },
    title: {
        '&:visited': {
            color: 'inherit'
        },
        textDecoration: 'none',
    }
}));

const Header = ({ isLoading }) => {
    const classes = useStyles();
    const setModalView = useSetRecoilState(modalAtom);
    const setAlert = useSetRecoilState(alertAtom);
    const resetUserState = useResetRecoilState(userAtom);
    const editorContent = useRecoilValue(editorAtom);
    const userState = useRecoilValue(userAtom);
    const [anchorEl, setAnchorEl] = useState()
    const location = useLocation();
    const history = useHistory();
    const articleToUpdate = useRecoilValue(articleFetchIDAtom);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 599.95) setAnchorEl(null)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])


    const signOut = async () => {
        await axios.get(api.signout, { withCredentials: true });
        resetUserState();
        setAnchorEl(null);
    }

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleSignOut = () => signOut();

    const handleClose = () => setAnchorEl(null);

    const publish = async (update) => {
        try {
            const { blocks, time } = editorContent;

            if (blocks.length === 0)
                return window.alert('Empty Article');

            if (blocks.length > 0 && blocks[0].type !== 'header')
                return window.alert('Article must start with a Heading.');

            let displayImage;
            for (let i = 0; i < blocks.length; i++) {
                if (blocks[i].type === 'image') {
                    if (Boolean(blocks[i].data.file.url)) {
                        displayImage = blocks[i].data.file.url;
                        break;
                    } else {
                        window.alert('Article must not contain empy image space.')
                        return;
                    }
                }
            }
            let subTitle;
            for (let i = 0; i < blocks.length; i++) {
                if (blocks[i].type === 'paragraph') {
                    subTitle = blocks[i].data.text;
                }
            }

            const title = blocks[0].data.text;

            if (!update) {
                await axios.post(
                    api.article,
                    { time, title, subTitle, displayImage, blocks, author: userState._id },
                    { withCredentials: true });

                history.push('/');

                setAlert({ hidden: false, message: 'Atricle Create!', severity: 'success' });
            } else {
                await axios.patch(
                    api.article + '/' + articleToUpdate,
                    { time, title, subTitle, displayImage, blocks, author: userState._id },
                    { withCredentials: true });

                history.push('/stories');

                setAlert({ hidden: false, message: 'Atricle Updated!', severity: 'success' })
            }

        } catch (err) {
            console.error(err.response);
        }
    }

    const getStartedBtn = (
        <Button
            size='small'
            disableElevation
            variant='outlined'
            color='inherit'
            className={classes.button}
            onClick={() => setModalView(current => ({ ...current, view: !current.view }))}
        >
            <Typography className={classes.buttonText}>
                Get Started
            </Typography>
        </Button>
    );

    const loggedInBtns = (
        <React.Fragment>
            {
                location.pathname === '/create' || location.pathname.includes('/edit') ? (
                    <Button
                        size='small'
                        disableElevation
                        variant='outlined'
                        color='inherit'
                        className={classes.button}
                        onClick={() => publish(location.pathname.includes('/edit'))}
                    >
                        <Typography className={classes.buttonText}>
                            {location.pathname.includes('/edit') ? 'Update' : 'Publish'}
                        </Typography>
                    </Button>
                ) : ''
            }

            <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <Avatar>{userState ? userState.firstName[0] : 'U'}</Avatar>
            </IconButton>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
                {
                    location.pathname !== '/create' ? (
                        <MenuItem
                            className={classes.buttonText}
                            component={Link}
                            to='/create'
                            onClick={handleClose}>
                            <Typography variant='body2'>
                                Write a story
                            </Typography>

                        </MenuItem>
                    ) : ''
                }
                <MenuItem
                    className={classes.buttonText}
                    component={Link}
                    to='/stories'
                    onClick={handleClose}
                >
                    <Typography variant='body2'>
                        Stories
                    </Typography>
                </MenuItem>

                <MenuItem
                    className={classes.buttonText}
                    onClick={handleSignOut}>
                    <Typography variant='body2'>
                        Sign out
                    </Typography>
                </MenuItem>
            </Menu>

        </React.Fragment>
    );

    const authSection = (
        <React.Fragment>
            {
                userState ? (
                    <React.Fragment>
                        {loggedInBtns}
                    </React.Fragment>
                ) : getStartedBtn
            }
        </React.Fragment>
    );

    return (
        <AppBar
            position="sticky"
            elevation={0}
            color='inherit'
            variant='outlined'
            className={classes.grow}
        >
            <Toolbar>
                <Typography
                    className={classes.title}
                    variant="h6"
                    component={Link}
                    to='/'
                    noWrap>
                    MediumClone
                </Typography>

                <div className={classes.grow} />
                {
                    !isLoading ? authSection : ''
                }
            </Toolbar>
        </AppBar>
    );
}

export default Header;