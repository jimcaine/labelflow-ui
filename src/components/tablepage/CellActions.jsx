import DeleteIcon from '@mui/icons-material/Delete';


export default function CellActions(props) {
  const deleteRow = props.deleteRow;
  return (
    <DeleteIcon
      onClick={(id) => deleteRow(id) } />
  )
}
