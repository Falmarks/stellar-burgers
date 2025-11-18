import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { registerUser } from '../../services/slices/userSlice';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const errorText = useSelector((state) => state.user.errorText);
  const isRegisterSuccess = useSelector(
    (state) => state.user.isRegisterSuccess
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      registerUser({
        name: userName,
        email,
        password
      })
    );
  };

  useEffect(() => {
    if (isRegisterSuccess) {
      setUserName('');
      setEmail('');
      setPassword('');
    }
  }, [isRegisterSuccess]);

  return (
    <RegisterUI
      errorText={errorText}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
