import React, { useState } from 'react';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import { useMutation } from 'react-query';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core'
import LineProgress from '@material-ui/core/LinearProgress';
import { modalAtom, alertAtom } from '../../global/global.state';
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
    const setAlert = useSetRecoilState(alertAtom);
    const { mutateAsync, isLoading } = useMutation(forgetPassword, {
        onMutate: () => {
            setModelOption(current => ({ ...current, loading: true }));
        },
        onSuccess: (data) => {
            setAlert({ hidden: false, message: data.message, severity: 'success' });
            resetModalState();
        },
        onError: () => {
            resetModalState();
            setAlert({
                hidden: false,
                message: 'Something went wrong. Please try again.',
                severity: 'error'
            });
        }
    });

    const [formState, setFormState] = useState({
        email: '',
    });

    const [emailError, setEmailError] = useState('')

    const handleSubmit = async e => {
        e.preventDefault();
        setEmailError('');

        const { email } = formState;

        if (!email) return setEmailError('Email is required.');

        // validate format email
        if (!isEmail(email)) return setEmailError('Invalid email format.');

        await mutateAsync(formState);
    }

    return (
        <React.Fragment>
            {isLoading ? <LineProgress /> : ''}
            <form noValidate onSubmit={handleSubmit}>
                <TextField
                    className={classes.field}
                    onChange={(e) => setFormState(() => ({ email: e.target.value }))}
                    label="Email"
                    variant="outlined"
                    type='email'
                    required
                    error={Boolean(emailError)}
                    helperText={emailError}
                    fullWidth
                    disabled={isLoading}
                />

                <Button
                    type='submit'
                    variant='outlined'
                    color='primary'
                    disabled={isLoading}
                >
                    Send Mail
                </Button>

            </form>
        </React.Fragment>
    );
}

export default ForgetPassowrd;