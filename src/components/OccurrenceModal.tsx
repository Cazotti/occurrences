import { useState } from 'react';
import { Backdrop, Button, createStyles, Fade, Modal, makeStyles, Snackbar, Theme } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import OccurrenceData from '../data-types/occurrence-data';
import OccurrenceForm from './OccurrenceForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    button: {
      width: '50%',
      margin:'0.5%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    }
  }),
);

interface Props {
  occurrence?: OccurrenceData;
  isUpdating: boolean;
  typeAction: string;
}

export default function OccurrenceModal ({ occurrence, isUpdating, typeAction}: Props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  return (
    <>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={() => isUpdating && !occurrence?.id ? (setOpenAlert(true)) : (setOpen(true))}
      > {typeAction} </Button>
    { open && (
      <Modal
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <OccurrenceForm occurrence={occurrence} typeAction={typeAction} setOpenModal={setOpen} />
          </div>
        </Fade>
      </Modal>
    )}
    <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    ><MuiAlert elevation={6} variant="filled" onClose={() => setOpenAlert(false)} severity='info'>Por favor, selecione uma ocorrência para alterar.</MuiAlert>
    </Snackbar>
  </>
  );
}
