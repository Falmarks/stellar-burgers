import { FC, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearOrder,
  orderBurger
} from '../../services/slices/orderBurgerSlice';
import { clearConstructor } from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ingredients: constructorIngredients, bun } = useSelector(
    (state) => state.burgerConstructor
  );

  const user = useSelector((state) => state.user.user);

  const {
    isOrderSuccess: successOrder,
    isLoading: orderRequest,
    orderData: orderModalData
  } = useSelector((state) => state.orderBurger);

  const ingredientsIds = useMemo(
    () => constructorIngredients.map((item) => item._id),
    [constructorIngredients]
  );

  const constructorItems = useMemo(
    () => ({
      bun,
      ingredients: constructorIngredients
    }),
    [bun, constructorIngredients]
  );

  const onOrderClick = useCallback(() => {
    if (!bun || orderRequest) return;

    if (user) {
      const allIngredients = [bun._id, ...ingredientsIds, bun._id];
      dispatch(orderBurger(allIngredients));
    } else {
      navigate('/login');
    }
  }, [bun, orderRequest, user, ingredientsIds, dispatch, navigate]);

  const closeOrderModal = useCallback(() => {
    dispatch(clearOrder());
  }, [dispatch]);

  useEffect(() => {
    if (successOrder) {
      dispatch(clearConstructor());
    }
  }, [successOrder, dispatch]);

  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = constructorIngredients.reduce(
      (total: number, ingredient: TConstructorIngredient) =>
        total + ingredient.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, constructorIngredients]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
