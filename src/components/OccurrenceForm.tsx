import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import { occurrenceCreateRequestAction, OccurrenceState, occurrenceUpdateRequestAction} from '../redux/occurrences';
import OccurrenceData from '../data-types/occurrence-data';

interface Props {
  occurrence?: OccurrenceData;
  typeAction: string;
  setOpenModal: any;
}

export default function OccurrenceForm ({ occurrence, typeAction, setOpenModal }: Props) {
  const dispatch = useDispatch();
  const { error } = useSelector(({ occurrence }: { occurrence: OccurrenceState }) => occurrence);

  const [code, setCode] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [registerAt, setRegisterAt] = useState<string>('');
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if(occurrence){
      setDescription(occurrence.description);
      setCode(occurrence.code);
      setRegisterAt(occurrence.registerAt);
    }
  }, [occurrence]);

  return (
    <>
      <h2>{typeAction} Occurrence</h2>
      <form className="form-occurrence" onSubmit={e => {
        e.preventDefault();
        occurrence ? dispatch(occurrenceUpdateRequestAction( {id: occurrence.id, code, description, registerAt } ))
                   : dispatch(occurrenceCreateRequestAction( {code, description, registerAt }));
        setOpenModal(false);
        setOpen(true);
      }}>
        <TextField
          variant="outlined"
          type="text"
          label="Code"
          margin="normal"
          value={code}
          required
          fullWidth
          onChange={(e:ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
        />
        <TextField
          id="date"
          label="RegisterAt"
          type="date"
          value={registerAt}
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
          value={description}
          required
          rowsMax={6}
          multiline
          fullWidth
          onChange={(e:ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
        />
        <Button
          style={{width: '49%', margin: '0.5%'}}
          variant="contained"
          color="primary"
          type="submit"
        > {typeAction} </Button>
        <Button
          style={{ width: '49%', margin: '0.5%'}}
          variant="contained"
          onClick={() => {setOpenModal(false)}}
        > Cancel</Button>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        { error ? ( <MuiAlert elevation={6} variant="filled" onClose={() => setOpen(false)} severity='error'>{error.message}</MuiAlert> )
                : ( <MuiAlert elevation={6} variant="filled" onClose={() => setOpen(false)} severity='success'>Ocorrência salva com sucesso!</MuiAlert> ) }
      </Snackbar>
    </>
  )
}
