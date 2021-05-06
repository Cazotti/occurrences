import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';

import { dateFormat } from '../helpers/date.helper';
import { occurrencesListRequestAction } from '../redux/occurrences';
import { OccurrenceState } from '../redux/occurrences';
import { useEffect } from 'react';

export default function TableOccurrences ({ setOccurrenceSelect }: any) {
  const { data } = useSelector(({ occurrence }: { occurrence: OccurrenceState }) => occurrence);
  const dispatch = useDispatch();

  useEffect(() => { dispatch(occurrencesListRequestAction()) }, [dispatch]);

  const rows = data.map((d) => {
    return {
      'id':d.id,
      'code': d.code,
      'description': d.description,
      'registerAt': dateFormat(d.registerAt),
    }
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'code', headerName: 'Code', width: 150 },
    { field: 'description', headerName: 'Description', width: 600 },
    { field: 'registerAt', headerName: 'RegisterAt', width: 150},
  ];

  return (
      <div style={{ height: '30em', width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={7}
          onRowClick={(param) => {
            setOccurrenceSelect({
              id: param.row.id,
              code: param.row.code,
              description: param.row.description,
              registerAt: param.row.registerAt.replace(/\//g,'-').split('-').reverse('').join('-'),
            })
          }}
        />
      </div>
   );
}
