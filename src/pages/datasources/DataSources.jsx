import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { getDataSources, deleteDataSource } from '../../store/dataSourcesSlice';

import TablePage from "../../components/tablepage/TablePage";

export default function DataSources() {

  // define page constants
  const titleName = "Data Sources";
  const entityName = "Data Source";
  const endpoint = "/datasource/";
  const columns = [
    {
      nm: "Data Source Name",
      dataSelector: "datasource_nm",
      type: "link",
      params: {
        "linkPathSelector": "id"
      },
    },
    {
      nm: "Entity ID",
      dataSelector: "entity_id",
      type: "text"
    },
    {
      nm: "Actions",
      dataSelector: null,
      type: "actions"
    }
  ]

  const dispatch = useDispatch();

  // init store state
  const data = useSelector((state) => state.dataSources.data);

  const deleteRecord = (dataSourceId) => {
    dispatch(deleteDataSource(dataSourceId));
  };

  // get data sources on load
  useEffect(() => {
    dispatch(getDataSources())
  }, []);

  return (
    <TablePage
      titleName={titleName}
      entityName={entityName}
      endpoint={endpoint} 
      columns={columns}
      data={data}
      deleteRecord={deleteRecord} />
  )
}