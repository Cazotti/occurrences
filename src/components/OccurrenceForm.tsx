import React, { useState, ChangeEvent } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import { occurrenceCreateRequestAction, OccurrenceState} from '../redux/occurrences';

export default function Login () {
  const dispatch = useDispatch();
  const { error } = useSelector(({ occurrence }: { occurrence: OccurrenceState }) => occurrence);

  const [code, setCode] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [registerAt, setRegisterAt] = useState<string>('');
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <form onSubmit={e => {
        e.preventDefault();
        dispatch( occurrenceCreateRequestAction( {code, description, registerAt } ) );
        {setTimeout(() => { return setOpen(true) }, 500)};
      } }>
        <TextField
          variant="outlined"
          type="text"
          label="Code"
          margin="normal"
          required
          fullWidth
          onChange={(e:ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
        />
        <TextField
          id="date"
          label="RegisterAt"
          type="date"
          fullWidth
          required
          InputLabelProps={{ shrink: true, }}
          onChange={(e:ChangeEvent<HTMLInputElement>) => setRegisterAt(e.target.value)}
        />
        <TextField
          variant="outlined"
          type="text"
          label="Description"
          margin="normal"
          required
          rowsMax={6}
          multiline
          fullWidth
          onChange={(e:ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
        > Create </Button>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        { error ? ( <MuiAlert elevation={6} variant="filled" onClose={() => setOpen(false)} severity='error'>{error.message}</MuiAlert> )
                : ( <MuiAlert elevation={6} variant="filled" onClose={() => setOpen(false)} severity='success'>Ocorrência criada com sucesso!</MuiAlert> )}
      </Snackbar>
    </>
  )
}
