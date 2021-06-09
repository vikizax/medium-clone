import React from 'react';
import { useSetRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { modalAtom, userAtom } from '../../globalState/global.state';
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
    },
}));

const Header = ({ isLoading }) => {
    const classes = useStyles();
    const setModalView = useSetRecoilState(modalAtom);
    const resetUserState = useResetRecoilState(userAtom);
    const userState = useRecoilValue(userAtom);

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

    const signOutBtn = (
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
    );

    const signOut = async () => {
        await axios.get(api.signout, { withCredentials: true });
        resetUserState();
    }

    const authSection = (
        <React.Fragment>
            {
                userState ? signOutBtn : getStartedBtn
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