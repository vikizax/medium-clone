import React from 'react';
import { atom, useSetRecoilState } from 'recoil';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SignIn from '../sign-in/sign-in.component';
import SignUp from '../sign-up/sign-up.component';

export const modalAtom = atom({
    key: 'modal',
    default: {
        view: false,
        option: ''
    }
});

// export const selectModelView = 

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const SignInSignUpModal = ({ option }) => {
    const classes = useStyles();
    const setModalView = useSetRecoilState(modalAtom);
    const handleOpen = () => {
        // setOpen(true);
    };

    const handleClose = () => {
        setModalView((current) => ({ ...current, view: false }));
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={handleOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={handleOpen}>
                    <div className={classes.paper}>

                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default SignInSignUpModal;