import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

type ProtectedProps = {
  onlyUnAuth: boolean;
  component: React.JSX.Element;
};

export const Protected = ({
  component,
  onlyUnAuth
}: ProtectedProps): React.JSX.Element => {
  const user = useSelector((state) => state.user.user);
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
  const location = useLocation();

  const from = location.state?.from || '/';

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return component;
};
