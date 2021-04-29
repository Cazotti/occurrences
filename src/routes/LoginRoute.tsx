import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { AuthState, loadTokenAction } from '../redux/auth';
import { getAuthService } from '../initializer';
import LoginPage from '../pages/LoginPage';

const LoginRoute = () => {
  const dispatch = useDispatch();
  const authService = getAuthService();

  useEffect(() => {
    const token = authService.getToken()
    if (token) {
      dispatch(loadTokenAction(token));
    }
  }, []);

  const { isAuthenticated } = useSelector(
    ({ auth }: { auth: AuthState }) => auth,
  );

  if (isAuthenticated) {
    return <Redirect to="/occurrenceForm" />;
  } else  {
    return <LoginPage />;
  }
};

export default LoginRoute;
