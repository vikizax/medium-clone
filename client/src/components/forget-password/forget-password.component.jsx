import React, { useState } from 'react';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import { useMutation } from 'react-query';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core'
import Link from '@material-ui/core/Link';
import LineProgress from '@material-ui/core/LinearProgress';
import { modalAtom } from '../../global/global.state';
import { forgetPassword } from '../../global/action';

import isEmail from 'validator/lib/isEmail';

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

const ForgetPassowrd = () => {
    const classes = useStyles();
    const setModelOption = useSetRecoilState(modalAtom);
    const resetModalState = useResetRecoilState(modalAtom);
    const { mutateAsync, isLoading } = useMutation(forgetPassword);

    const [formState, setFormState] = useState({
        email: '',
        password: '',
    });

    const [emailError, setEmailError] = useState('')

    const handleSubmit = async e => {
        e.preventDefault();
        setEmailError('');

        const { email, password: pwd } = formState;

        // check empty required field
        if (!email && !pwd) {
            return;
        }
        if (!email) return setEmailError('Email is required.');

        // validate format email
        if (!isEmail(email)) return setEmailError('Invalid email format.');

        // await mutateAsync(formState);
    }

    return (
        <React.Fragment>
            {/* {isLoading ? <LineProgress /> : ''} */}
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
                // disabled={isLoading}
                />

                <Button
                    type='submit'
                    variant='outlined'
                    color='primary'
                // disabled={isLoading}
                >
                    Send Mail
                </Button>

                {/* {
                    !isLoading ?
                        (
                            <Link href=''
                                onClick={
                                    (e) => {
                                        e.preventDefault();
                                        setModelOption(current => ({ ...current, option: 'signup' }))
                                    }
                                }>Signup</Link>

                        ) : ''
                } */}
            </form>
        </React.Fragment>
    );
}

export default ForgetPassowrd;