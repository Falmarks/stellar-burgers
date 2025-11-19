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
import { getFeed } from '../../services/slices/feedSlice';
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
    dispatch(getFeed());
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

  const modalRoutes = [
    { path: '/ingredients/:id', title: 'Детали ингредиента' },
    { path: '/feed/:number', title: 'Детали заказа' },
    { path: '/profile/orders/:number', title: 'Детали заказа' }
  ];

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />

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

        <Route path='/profile/orders/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          {modalRoutes.map(({ path, title }) => (
            <Route
              key={path}
              path={path}
              element={
                <Modal title={title} onClose={handleModalClose}>
                  {path.includes('ingredients') ? (
                    <IngredientDetails />
                  ) : (
                    <OrderInfo />
                  )}
                </Modal>
              }
            />
          ))}
        </Routes>
      )}
    </div>
  );
};

export default App;
