import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    }
})

const SignUp = () => {
    const classes = useStyles();
    const handleSubmit = e => e.preventDefault();

    return (

        <form onSubmit={handleSubmit}>
            <TextField
                className={classes.field}
                onChange={(e) => console.log(e.target.value)}
                label="Email"
                variant="outlined"
                type='email'
                required
            />
            <TextField
                className={classes.field}
                onChange={(e) => console.log(e.target.value)}
                label="Password"
                type='password'
                variant="outlined"
                required
            />


            <Button type='submit' variant='outlined' color='primary'>
                Sign-In
            </Button>

        </form>

    );
}

export default SignUp;