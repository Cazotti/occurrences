import React, { useState, ChangeEvent } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { AuthState } from '../redux/auth';
import { AuthTypes } from '../enums/auth-types.enum';
import './LoginForm.style.css';

export default function Login () {
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const { error } = useSelector(({ auth }: { auth: AuthState }) => auth);

  const disptach = useDispatch();

  return (
    <main>
      {error && <p>{error.message}</p>}
      <form onSubmit={e => {
        e.preventDefault();
        disptach( {
          type: AuthTypes.SIGN_IN_REQUEST,
          payload: { email: email, password: password },
        } );
      } }>
        <TextField
          variant="outlined"
          type="email"
          label="E-mail"
          margin="normal"
          fullWidth
          onChange={(e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          type="password"
          label="Password"
          margin="normal"
          fullWidth
          onChange={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
        > Entrar </Button>
      </form>
    </main>
  )
}
