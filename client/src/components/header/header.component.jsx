import React, { useState, useEffect } from 'react';
import { useSetRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { useMutation, useQueryClient } from 'react-query';
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
import { editorAtom, modalAtom, userAtom, alertAtom } from '../../global/global.state';
import { publishArticle } from '../../global/action';
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
    const queryClient = useQueryClient();

    const { mutateAsync, reset } = useMutation(publishArticle, {
        onSuccess: () => {
            
            queryClient.invalidateQueries('articleQ');

            reset();
            if (location.pathname.includes('/edit')) {
                history.push('/stories');
                setAlert({ hidden: false, message: 'Atricle Updated!', severity: 'success' });
            } else {
                history.push('/');
                setAlert({ hidden: false, message: 'Atricle Created!', severity: 'success' });
            }
        },
        onError: () => {
            reset();
            setAlert({ hidden: false, message: 'Something went wrong. Please try again.', severity: 'error' });
        }
    });

    const articleToUpdate =
        location.pathname.startsWith('/edit') ?
            location.pathname.replace('/edit/', '') : null;

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

        if (!editorContent)
            return setAlert({
                hidden: false,
                message: 'No changes made.',
                severity: 'warning'
            });

        const { blocks, time } = editorContent;

        if (blocks.length === 0)
            return setAlert({
                hidden: false,
                message: 'Empty Article.',
                severity: 'warning'
            });

        if (blocks.length > 0 && blocks[0].type !== 'header')
            return setAlert({
                hidden: false,
                message: 'Article must start with a Heading.',
                severity: 'warning'
            });

        let displayImage;
        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].type === 'image') {
                if (Boolean(blocks[i].data.file.url)) {
                    displayImage = blocks[i].data.file.url.replace(api.image, '');
                    break;
                } else {
                    setAlert({
                        hidden: false,
                        message: 'Article must not contain empty image space.',
                        severity: 'warning'
                    });
                    return;
                }
            }
        }

        if (!displayImage)
            return setAlert({
                hidden: false,
                message: 'Article must have a display image.',
                severity: 'warning'
            });

        let subTitle;
        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].type === 'paragraph') {
                subTitle = blocks[i].data.text;
                break;
            }
        }

        const title = blocks[0].data.text;

        await mutateAsync(
            {
                time,
                title,
                subTitle,
                displayImage,
                blocks,
                author: userState._id,
                articleToUpdate: update ? articleToUpdate : null
            },
        );
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