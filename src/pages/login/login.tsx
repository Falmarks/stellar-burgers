import { FC, SyntheticEvent } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../services/slices/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

export const Login: FC = () => {
  const { values, handleChange } = useForm({
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const errorText = useSelector((state) => state.user.errorText);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(values));
      const from = location.state?.from || '/';
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <LoginUI
      errorText={errorText}
      email={values.email}
      setEmail={(email) =>
        handleChange({ target: { name: 'email', value: email } } as any)
      }
      password={values.password}
      setPassword={(password) =>
        handleChange({ target: { name: 'password', value: password } } as any)
      }
      handleSubmit={handleSubmit}
    />
  );
};
