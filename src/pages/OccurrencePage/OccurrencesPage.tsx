import { useState } from 'react';
import { Button, Snackbar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import MuiAlert from '@material-ui/lab/Alert';

import { occurrenceDeleteRequestAction } from '../../redux/occurrences';
import DataGridOccurrences from '../../components/DataGridOccurrences';
import NavBarMenu from '../../components/NavBarMenu';
import OccurrenceModal from '../../components/OccurrenceModal';
import OccurrenceData from '../../data-types/occurrence-data';
import './OccurrencePage.style.scss';

const OccurrencePage = () => {
  const [occurrenceSelect, setOccurrenceSelect] = useState<OccurrenceData>();
  const [openAlert, setOpenAlert] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <header>
        <NavBarMenu/>
      </header>
      <main className='main-data-grid'>
        <DataGridOccurrences setOccurrenceSelect={setOccurrenceSelect}/>
        <OccurrenceModal occurrence={occurrenceSelect} isUpdating={true} typeAction='Update' />
        <OccurrenceModal isUpdating={false} typeAction='Create' />
        <Button
          color="primary"
          onClick={() => { occurrenceSelect?.id ? dispatch(occurrenceDeleteRequestAction(occurrenceSelect?.id)) : setOpenAlert(true)}}
          style={{width: '50%', margin: '0.5%'}}
          variant="contained"
        > Delete </Button>
      </main>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        open={openAlert}
        onClose={() => setOpenAlert(false)}
      ><MuiAlert elevation={6} variant="filled" onClose={() => setOpenAlert(false)} severity='info'>Por favor, selecione uma ocorrência para excluir.</MuiAlert>
      </Snackbar>
    </>
  )
}

export default OccurrencePage;
