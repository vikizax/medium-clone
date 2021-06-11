import React, { useState } from 'react';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import LineProgress from '@material-ui/core/LinearProgress';
import { modalAtom, userAtom } from '../../global/global.state';
import isEmail from 'validator/lib/isEmail';
import api from '../../constant/api.constant';

const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    },
    foot: {
        marginTop: 20,
        fontSize: 12
    }
});

const SignUp = () => {
    const classes = useStyles();

    const setModelOption = useSetRecoilState(modalAtom);
    const setUserState = useSetRecoilState(userAtom);
    const resetModalState = useResetRecoilState(modalAtom);

    const [formState, setFormState] = useState({
        email: '',
        password: '',
    });


    const [emailError, setEmailError] = useState('')
    const [pwdError, setPwdError] = useState('')
    const [loading, setLoading] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        setEmailError('');
        setPwdError('');

        const { email, password: pwd } = formState;

        // check empty required field
        if (!email && !pwd) {
            setEmailError('Email is required.');
            setPwdError('Password is required.');
            return;
        }
        if (!email) return setEmailError('Email is required.');
        if (!pwd) return setPwdError('Password is required.');

        // validate format email
        if (!isEmail(email)) return setEmailError('Invalid email format.');

        setLoading(true);
        axios.post(api.signin, formState, {
            withCredentials:true
        })
            .then(response => {
                setUserState(response.data.result)
                resetModalState();
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                setEmailError(error.response.data.message)
                setPwdError(error.response.data.message)
            });
    }

    return (
        <React.Fragment>
        {loading ? <LineProgress /> : ''}
        <form noValidate onSubmit={handleSubmit}>
            <TextField
                className={classes.field}
                onChange={(e) => setFormState(current => ({ ...current, email: e.target.value }))}
                label="Email"
                variant="outlined"
                type='email'
                required
                error={Boolean(emailError)}
                helperText={emailError}
                fullWidth
                disabled={loading}
            />
            <TextField
                className={classes.field}
                onChange={(e) => setFormState(current => ({ ...current, password: e.target.value }))}
                label="Password"
                type='password'
                variant="outlined"
                required
                error={Boolean(pwdError)}
                helperText={pwdError}
                fullWidth
                disabled={loading}
            />

            <Button
                type='submit'
                variant='outlined'
                color='primary'
                disabled={loading}
            >
                Sign-In
            </Button>

            {
                !loading ?
                    (      
                        <Typography className={classes.foot}>
                            Don't have an account ? {' '}
                            <Link href=''
                                onClick={
                                    (e) => {
                                        e.preventDefault();
                                        setModelOption(current => ({ ...current, option: 'signup' }))
                                    }
                                }>Signup</Link>
                        </Typography>
                    ) : ''
                }
        </form>
        </React.Fragment>
    );
}

export default SignUp;