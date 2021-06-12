import React, { useState } from 'react';
import { useSetRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { editorAtom, modalAtom, userAtom, alertAtom } from '../../global/global.state';
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
    menu: {
        display: 'none',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        }
    },
    hideNavBtn: {
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        }
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

    const publish = async () => {
        try {
            const { blocks, time } = editorContent;

            if (blocks.length == 0)
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

            await axios.post(
                api.article,
                { time, title, subTitle, displayImage, blocks, author: userState._id },
                { withCredentials: true });

            history.push('/');
                
            setAlert({ hidden: false, message: 'Atricle Create!', severity: 'success' });

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
                location.pathname == '/create' ? (
                    <Button
                        size='small'
                        disableElevation
                        variant='outlined'
                        color='inherit'
                        className={classes.button}
                        onClick={() => publish()}
                    >
                        <Typography className={classes.buttonText}>
                            Publish
                        </Typography>
                    </Button>
                ) : ''
            }
            <div className={classes.hideNavBtn}>
                {
                    location.pathname != '/create' ?
                        (
                            <Button
                                size='small'
                                disableElevation
                                variant='outlined'
                                color='inherit'
                                className={classes.button}
                                component={Link} to='/create'
                            >
                                <Typography className={classes.buttonText}>
                                    Create Article
                                </Typography>
                            </Button>) : ''
                }

                <Button
                    size='small'
                    disableElevation
                    variant='outlined'
                    color='inherit'
                    className={classes.button}
                    onClick={() => signOut()}
                >
                    <Typography className={classes.buttonText}>
                        Sign Out
                    </Typography>
                </Button>
            </div>


        </React.Fragment>
    );

    const menuBtn = (
        <div className={classes.menu}>
            <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    location.pathname != '/create' ? (
                        <MenuItem
                            className={classes.buttonText}
                            component={Link}
                            to='/create'
                            onClick={handleClose}>
                            CREATE ARTICLE
                        </MenuItem>
                    ) : ''
                }

                <MenuItem
                    className={classes.buttonText}
                    onClick={handleSignOut}>
                    SIGN OUT
                </MenuItem>
            </Menu>
        </div>
    )

    const authSection = (
        <React.Fragment>
            {
                userState ? (
                    <React.Fragment>
                        {loggedInBtns}
                        {menuBtn}
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

                <Typography className={classes.title} variant="h6" noWrap>
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