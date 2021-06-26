import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { updatePassword } from '../../global/action';
import { modalAtom, alertAtom } from '../../global/global.state';

const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    },
    title: {
        marginTop: 20
    }
});

const UpdatePassword = () => {

    const classes = useStyles();
    const params = useParams();
    const setModelOption = useSetRecoilState(modalAtom);
    const resetModalState = useResetRecoilState(modalAtom);
    const setAlert = useSetRecoilState(alertAtom);

    const [formState, setFormState] = useState({
        password: '',
        confirmPassword: ''
    });

    const [pwdError, setPwdError] = useState('')
    const [confPwdError, setConfPwdError] = useState('');

    const { mutateAsync, isLoading } = useMutation(updatePassword, {
        onMutate: () => {
            setModelOption(current => ({ ...current, loading: true }));
        },
        onSuccess: data => {
            resetModalState();
            setAlert({
                hidden: false,
                message: 'Password Changed.',
                severity: 'success'
            });
        },
        onError: () => {
            setModelOption(current => ({ ...current, loading: false }));
            setAlert({
                hidden: false,
                message: 'Something went wrong. Please try again.',
                severity: 'error'
            });
        }
    });

    const handleSubmit = async e => {
        e.preventDefault();

        setConfPwdError('');
        setPwdError('');

        const { password: pwd, confirmPassword: confPwd } = formState;

        if (!confPwd && !pwd) {
            setPwdError('Password is required.');
            setConfPwdError('Confirm Password is required.');
            return;
        }
        if (!pwd) return setPwdError('Password is required.');
        if (!confPwd) return setConfPwdError('Confirm Password is required.');

        if (confPwd !== pwd)
            return setConfPwdError('Password does not match.')

        await mutateAsync({ password: pwd, token: params.token });

    }

    return (
        <Container maxWidth={'xs'}>
            <Box display={'flex'} flexDirection={'column'} >
                {isLoading ? <LinearProgress /> : ''}

                <Typography variant='subtitle1' className={classes.title}>
                    Update Password
                </Typography>

                <form noValidate onSubmit={handleSubmit}>
                    <TextField
                        className={classes.field}
                        onChange={(e) => setFormState(current => ({ ...current, password: e.target.value }))}
                        label="Password"
                        variant="outlined"
                        type='password'
                        required
                        error={Boolean(pwdError)}
                        helperText={pwdError}
                        fullWidth
                        disabled={isLoading}
                    />
                    <TextField
                        className={classes.field}
                        onChange={(e) => setFormState(current => ({ ...current, confirmPassword: e.target.value }))}
                        label="Confirm Password"
                        variant="outlined"
                        type='Password'
                        required
                        error={Boolean(confPwdError)}
                        helperText={confPwdError}
                        fullWidth
                        disabled={isLoading}
                    />

                    <Button
                        type='submit'
                        variant='outlined'
                        color='primary'
                        disabled={isLoading}
                        size='small'
                    >
                        Update Password
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default UpdatePassword;