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
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getIngredients } from '../../services/slices/burgerIngredientsSlice';
import { getFeed } from '../../services/slices/feedSlice';
import { Protected } from '../Protected/Protected';
import { checkUserAuth } from '../../services/slices/userSlice';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const handleModalClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getFeed());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/login'
          element={<Protected onlyUnAuth component={<Login />} />}
        />
        <Route
          path='/register'
          element={<Protected onlyUnAuth component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<Protected onlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<Protected onlyUnAuth component={<ResetPassword />} />}
        />
        <Route
          path='/profile'
          element={<Protected onlyUnAuth={false} component={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={
            <Protected onlyUnAuth={false} component={<ProfileOrders />} />
          }
        />
        <Route path='/profile/orders/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

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
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
