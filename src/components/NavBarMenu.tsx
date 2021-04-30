import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { signOutAction } from '../redux/auth';

export default function NavBarMenu () {
  const disptach = useDispatch();

  return (
    <div className='nav-bar-header'>
      <h2>Occurrences</h2>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={
        () => disptach(signOutAction())}>
        Logout
      </Button>
    </div>
  )
}
