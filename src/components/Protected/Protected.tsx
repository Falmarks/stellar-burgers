import React from 'react';
import { Navigate } from 'react-router-dom';
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

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' replace />;
  }

  if (onlyUnAuth && user) {
    return <Navigate to='/profile' replace />;
  }

  return component;
};
