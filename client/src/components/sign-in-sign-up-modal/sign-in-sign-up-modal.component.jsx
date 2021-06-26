import React from 'react';
import { useRecoilState } from 'recoil';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SignIn from '../sign-in/sign-in.component';
import SignUp from '../sign-up/sign-up.component';
import ForgetPassword from '../forget-password/forget-password.component';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { modalAtom } from '../../global/global.state';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: 'white',
        padding: theme.spacing(3, 4, 3),
        borderRadius: 10
    },
}));

const SignInSignUpModal = () => {
    const classes = useStyles();
    const [modal, setModalOption] = useRecoilState(modalAtom);

    const handleClose = () => {
        setModalOption((current) => ({ ...current, view: false, option: '' }));
    };

    const changeTo = (option) => setModalOption(current => ({ ...current, option }));

    const defaultContent = (
        <React.Fragment>
            <Box marginBottom={2}>
                <Typography gutterBottom>
                    Join MediumClone!
                </Typography>

                <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => changeTo('signup')}
                >
                    Sign up
                </Button>
            </Box>
            <Box>
                <Typography gutterBottom>
                    Already a user ?
                </Typography>
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => changeTo('signin')}
                >
                    Sign in
                </Button>
            </Box>
        </React.Fragment>
    );

    return (
        <Box>
            <Modal
                className={classes.modal}
                open={modal.view}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                disableBackdropClick={modal.loading}
            >
                <Fade in={modal.view}>

                    <Box alignSelf='center'>
                        <Container className={classes.paper} >
                            {
                                modal.option === 'signup' ? <SignUp /> :
                                    modal.option === 'signin' ? <SignIn /> :
                                        modal.option === 'forgetpassword' ? <ForgetPassword /> : defaultContent
                            }
                        </Container>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}

export default SignInSignUpModal;

