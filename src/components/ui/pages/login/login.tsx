import { FC, memo, useCallback } from 'react';
import {
  Input,
  Button,
  PasswordInput
} from '@zlden/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from '../common.module.css';
import { LoginUIProps } from './type';

export const LoginUI: FC<LoginUIProps> = memo(
  ({ email, setEmail, errorText, handleSubmit, password, setPassword }) => {
    const handleEmailChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
      },
      [setEmail]
    );

    const handlePasswordChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
      },
      [setPassword]
    );

    return (
      <main className={styles.container}>
        <div className={`pt-6 ${styles.wrapCenter}`}>
          <h3 className='pb-6 text text_type_main-medium'>Вход</h3>
          <form
            className={`pb-15 ${styles.form}`}
            name='login'
            onSubmit={handleSubmit}
            noValidate
          >
            <div className='pb-6'>
              <Input
                type='email'
                placeholder='E-mail'
                onChange={handleEmailChange}
                value={email}
                name='email'
                error={false}
                errorText=''
                size='default'
                required
              />
            </div>
            <div className='pb-6'>
              <PasswordInput
                onChange={handlePasswordChange}
                value={password}
                name='password'
                required
              />
            </div>
            <div className={`pb-6 ${styles.button}`}>
              <Button type='primary' size='medium' htmlType='submit'>
                Войти
              </Button>
            </div>
            {errorText && (
              <p
                className={`${styles.error} text text_type_main-default pb-6`}
                role='alert'
              >
                {errorText}
              </p>
            )}
          </form>
          <div
            className={`pb-4 ${styles.question} text text_type_main-default`}
          >
            Вы - новый пользователь?
            <Link to='/register' className={`pl-2 ${styles.link}`}>
              Зарегистрироваться
            </Link>
          </div>
          <div
            className={`${styles.question} text text_type_main-default pb-6`}
          >
            Забыли пароль?
            <Link to='/forgot-password' className={`pl-2 ${styles.link}`}>
              Восстановить пароль
            </Link>
          </div>
        </div>
      </main>
    );
  }
);
