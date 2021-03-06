import React, { useState } from 'react';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import { useMutation } from 'react-query';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import LineProgress from '@material-ui/core/LinearProgress';
import isEmail from 'validator/lib/isEmail';
import { userAtom, modalAtom } from '../../global/global.state';
import { signUp } from '../../global/action';

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
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [fNameError, setFNameError] = useState('');
    const [emailError, setEmailError] = useState('')
    const [pwdError, setPwdError] = useState('')
    const [confPwdError, setConfPwdError] = useState('')

    const { mutateAsync, isLoading } = useMutation(signUp, {
        onMutate: () => {
            setModelOption(current => ({ ...current, loading: true }));
        },
        onSuccess: (data) => {
            setUserState(data);
            resetModalState();
        },
        onError: (error) => {
            setModelOption(current => ({ ...current, loading: false }));
            if (error.response.status === 409)
                setEmailError(error.response.data.message)
        }
    });


    const handleSubmit = async e => {
        e.preventDefault();
        setFNameError('');
        setEmailError('');
        setPwdError('');
        setConfPwdError('');

        const { firstName: fname, email, password: pwd, confirmPassword: cpwd } = formState;
        // check empty required field
        if (!fname && !email && !pwd && !cpwd) {
            setFNameError('First Name is required.');
            setEmailError('Email is required.');
            setPwdError('Password is required.');
            setConfPwdError('Confirm Pasword is required.');
            return;
        }

        // check speicific required
        if (!fname) return setFNameError('First Name is required.');
        if (!email) return setEmailError('Email is required.');
        if (!pwd) return setPwdError('Password is required.');
        if (!cpwd) return setConfPwdError('Confirm Pasword is required.');


        // validate format email
        if (!isEmail(email)) return setEmailError('Invalid email format.');

        // check for password length >=6
        if (!(pwd.length >= 6)) return setPwdError('Password length should be equal to or greater than 6.')

        // check password == confirm password
        if (pwd !== cpwd) return setConfPwdError('Password does not match.')

        await mutateAsync(formState);

    }

    return (
        <React.Fragment>
            {isLoading ? <LineProgress /> : ''}
            <form noValidate onSubmit={handleSubmit}>
                <TextField
                    className={classes.field}
                    onChange={(e) => setFormState(current => ({ ...current, firstName: e.target.value }))}
                    label="First Name"
                    variant="outlined"
                    error={Boolean(fNameError)}
                    helperText={fNameError}
                    required
                    fullWidth
                    disabled={isLoading}
                />
                <TextField
                    className={classes.field}
                    onChange={(e) => setFormState(current => ({ ...current, lastName: e.target.value }))}
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    disabled={isLoading}
                />
                <TextField
                    className={classes.field}
                    onChange={(e) => setFormState(current => ({ ...current, email: e.target.value }))}
                    label="Email"
                    variant="outlined"
                    type='email'
                    error={Boolean(emailError)}
                    helperText={emailError}
                    required
                    fullWidth
                    disabled={isLoading}
                />
                <TextField
                    className={classes.field}
                    onChange={(e) => setFormState(current => ({ ...current, password: e.target.value }))}
                    label="Password"
                    type='password'
                    variant="outlined"
                    error={Boolean(pwdError)}
                    helperText={pwdError}
                    required
                    fullWidth
                    disabled={isLoading}
                />
                <TextField
                    className={classes.field}
                    onChange={(e) => setFormState(current => ({ ...current, confirmPassword: e.target.value }))}
                    label="Confirm Password"
                    variant="outlined"
                    type='password'
                    error={Boolean(confPwdError)}
                    helperText={confPwdError}
                    required
                    fullWidth
                    disabled={isLoading}
                />

                <Button
                    type='submit'
                    variant='outlined'
                    color='primary'
                    disabled={isLoading}
                >
                    Sign-UP
                </Button>

                {
                    !isLoading ?
                        (<Typography className={classes.foot}>
                            Already a user ? {' '}
                            <Link href=''
                                onClick={
                                    (e) => {
                                        e.preventDefault();
                                        setModelOption(current => ({ ...current, option: 'signin' }))
                                    }
                                }>Signin</Link>
                        </Typography>) : ''
                }
            </form>
        </React.Fragment>
    );
}

export default SignUp;