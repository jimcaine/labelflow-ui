import { useDispatch, useSelector } from 'react-redux';

import { DataGrid } from '@mui/x-data-grid';

export default function AnalyzerValidations() {
  // store
  const analyzerSlice = useSelector((state) => state.analyzer);
  const dataRows = analyzerSlice.data.data.rows;
  const dataCols = useSelector((state) => state.analyzer.data.data.cols);
  const selectedItems = analyzerSlice.data.selectedItems;

  const selectedRows = dataRows.filter((row) => selectedItems.includes(row.id));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={selectedRows}
        columns={dataCols}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 25, 50 ,100]} />
    </div>
  )
}