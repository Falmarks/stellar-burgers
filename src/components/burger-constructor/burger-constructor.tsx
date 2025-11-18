import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearOrder,
  orderBurger
} from '../../services/slices/orderBurgerSlice';
import { useNavigate } from 'react-router-dom';
import { clearConstructor } from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorIngredients = useSelector(
    (state) => state.burgerConstructor.ingredients
  );
  const bun = useSelector((state) => state.burgerConstructor.bun);
  const user = useSelector((state) => state.user.user);
  const ingredientsIds = constructorIngredients.map((item) => item._id);
  const constructorItems = {
    bun: bun,
    ingredients: constructorIngredients
  };
  const successOrder = useSelector((state) => state.orderBurger.isOrderSuccess);

  const orderRequest = useSelector((state) => state.orderBurger.isLoading);

  const orderModalData = useSelector((state) => state.orderBurger.orderData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (user) {
      const allIngredients = [
        constructorItems.bun._id,
        ...ingredientsIds,
        constructorItems.bun._id
      ];
      dispatch(orderBurger(allIngredients));
    } else {
      navigate('/login');
    }
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  useEffect(() => {
    if (successOrder) {
      dispatch(clearConstructor());
    }
  }, [successOrder, dispatch]);

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

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
