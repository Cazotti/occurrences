import { useState, ChangeEvent } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { AuthState, signInRequestAction } from '../redux/auth';

export default function Login () {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { error } = useSelector(({ auth }: { auth: AuthState }) => auth);

  const dispatch = useDispatch();

  return (
    <main className='main-login'>
      {error && <p>{error.message}</p>}
      <form onSubmit={e => {
        e.preventDefault();
        dispatch( signInRequestAction( {email, password} ) );
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
