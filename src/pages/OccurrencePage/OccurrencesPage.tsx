import NavBarMenu from '../../components/NavBarMenu';
import DataGridOccurrences from '../../components/DataGridOccurrences';
import OccurrenceModal from '../../components/OccurrenceModal';
import OccurrenceData from '../../data-types/occurrence-data';
import './OccurrencePage.style.scss';
import { useState } from 'react';

const OccurrencePage = () => {
  const [occurrenceSelect, setOccurrenceSelect] = useState<OccurrenceData>();

  return (
    <>
      <header>
        <NavBarMenu/>
      </header>
      <main className='main-data-grid'>
        <DataGridOccurrences setOccurrenceSelect={setOccurrenceSelect}/>
        <OccurrenceModal occurrence={occurrenceSelect} isUpdating={true} typeAction='Update' />
        <OccurrenceModal isUpdating={false} typeAction='Create' />
      </main>
    </>
  )
}
//<OccurrenceForm occurrence={{ id: 0, code: '', description: '', registerAt: ''}} />
export default OccurrencePage;
