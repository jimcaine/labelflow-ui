import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { useDispatch } from 'react-redux';
import { setSelectedItems } from '../../../store/analyzerSlice';

export default function AnalyzerData({columns, rows}) {

  const dispatch = useDispatch();
  const [valItems, setValItems] = useState([]);
  
  const handleSelectionChange = (val) => {
    setValItems(val);
    dispatch(setSelectedItems(val));
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 25, 50 ,100]}
        checkboxSelection
        selectionModel={valItems}
        onSelectionModelChange={(v, e) => handleSelectionChange(v) }
      />
    </div>
  )
}