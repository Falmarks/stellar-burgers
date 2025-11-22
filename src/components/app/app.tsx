import { useEffect, useCallback } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Protected } from '../Protected/Protected';
import { useDispatch } from '../../services/store';
import { getIngredients } from '../../services/slices/burgerIngredientsSlice';
import { checkUserAuth } from '../../services/slices/userSlice';
import '../../index.css';
import styles from './app.module.css';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.background;

  const handleModalClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  const protectedRoutes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/forgot-password', component: ForgotPassword },
    { path: '/reset-password', component: ResetPassword }
  ];

  const authProtectedRoutes = [
    { path: '/profile', component: Profile },
    { path: '/profile/orders', component: ProfileOrders }
  ];

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/profile/orders/:number'
          element={<Protected onlyUnAuth={false} component={<OrderInfo />} />}
        />

        {protectedRoutes.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={<Protected onlyUnAuth component={<Component />} />}
          />
        ))}

        {authProtectedRoutes.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={<Protected onlyUnAuth={false} component={<Component />} />}
          />
        ))}
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Модальные окна */}
      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали заказа' onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='Детали заказа' onClose={handleModalClose}>
                <Protected onlyUnAuth={false} component={<OrderInfo />} />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
