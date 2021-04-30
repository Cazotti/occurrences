import React, { useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AuthState, loadTokenAction } from '../redux/auth';
import { getAuthService } from '../initializer';

interface Props extends Omit<RouteProps, 'component'> {
  component: React.ElementType;
}

const PrivateRoute = ({ component: Component }: Props) => {
  const dispatch = useDispatch();
  const authService = getAuthService();
  const token = authService.getToken();

  useEffect(() => {
    if (token) dispatch(loadTokenAction(token));
  }, [dispatch, token]);

  const { isAuthenticated } = useSelector( ({ auth }: { auth: AuthState }) => auth );

  return (
    <Route render={(props) => {
      return isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )}
    }/>
  );
};

export default PrivateRoute;
