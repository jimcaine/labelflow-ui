import { useNavigate } from 'react-router-dom';

import Link from '@mui/material/Link';

export default function CellLink(props) {
  const navigate = useNavigate();

  // unpack props
  const val = props.val;
  const navigatePath = props.navigatePath;

  return (
    <Link
    href="#"
    component="button"
    onClick={() => navigate(navigatePath) }>{val}</Link>
  )
}