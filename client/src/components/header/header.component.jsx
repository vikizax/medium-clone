import React from 'react';
import { useSetRecoilState } from 'recoil';

import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { modalAtom } from '../sign-in-sign-up-modal/sign-in-sign-up-modal.component'

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

const Header = () => {
    const classes = useStyles();
    const setModalView = useSetRecoilState(modalAtom);
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

            </Toolbar>
        </AppBar>
    );
}

export default Header;