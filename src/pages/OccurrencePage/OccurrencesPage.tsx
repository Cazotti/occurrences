import NavBarMenu from '../../components/NavBarMenu';
import DataGridOccurrences from '../../components/DataGridOccurrences';
import OccurrenceForm from '../../components/OccurrenceForm';
import './OccurrencePage.style.scss';

const OccurrencePage = () => {
  return (
    <>
      <header>
        <NavBarMenu/>
      </header>
      <main>
        <OccurrenceForm/>
        <DataGridOccurrences/>
      </main>
    </>
  )
}

export default OccurrencePage;
