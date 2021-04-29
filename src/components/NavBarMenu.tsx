import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { AuthTypes } from '../enums/auth-types.enum';
import './NavBarMenu.style.css';

export default function NavBarMenu () {
  const disptach = useDispatch();

  return (
    <div className='nav-bar-header'>
      <h2>Occurrences</h2>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={
        () => disptach({ type: AuthTypes.SIGN_OUT_REQUEST })}>
        Logout
      </Button>
    </div>
  )
}
