import NavBarMenu from '../../components/NavBarMenu';
import DataGridOccurrences from '../../components/DataGridOccurrences';
import './OccurrencePage.style.scss';

const OccurrencePage = () => {
  return (
    <>
      <header>
        <NavBarMenu/>
      </header>
      <main>
        <DataGridOccurrences/>
      </main>
    </>
  )
}

export default OccurrencePage;
