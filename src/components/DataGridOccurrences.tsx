import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';

import { dateFormat } from '../helpers/date.helper';
import { occurrencesListRequestAction } from '../redux/occurrences';
import { OccurrenceState } from '../redux/occurrences';
import { useEffect } from 'react';

export default function TableOccurrences () {
  const { data } = useSelector(({ occurrence }: { occurrence: OccurrenceState }) => occurrence);
  const dispatch = useDispatch();

  useEffect(() => { dispatch(occurrencesListRequestAction()) }, [dispatch]);

  const rows = data.map((d) => {
    return {
      'id':d.id,
      'code': d.code,
      'description': d.description,
      'registerAt': dateFormat(d.registerAt)};
    }
  );

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'code', headerName: 'Code', width: 150 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'registerAt', headerName: 'RegisterAt', width: 220 },
  ];

  return (
    <div style={{ height: '30em', width: '50em' }}>
      <DataGrid rows={rows} columns={columns} pageSize={7} checkboxSelection />
    </div>
  );
}
