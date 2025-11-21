import { FC, useEffect, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { getOrderByNumber } from '../../services/slices/orderBurgerSlice';

type TIngredientsWithCount = {
  [key: string]: TIngredient & { count: number };
};

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams();
  const location = useLocation();

  const orderByNumber = useSelector((state) => state.orderBurger.orderByNumber);
  const feedOrders = useSelector((state) => state.feed.orders);
  const profileOrders = useSelector((state) => state.user.userOrders);
  const ingredients = useSelector(
    (state) => state.burgerIngredients.ingredients
  );

  const isModal = location.state?.background;
  const isProfileOrder = location.pathname.includes('/profile/orders');

  useEffect(() => {
    if (!number) return;

    const orderNumber = Number(number);

    if (!isModal) {
      dispatch(getOrderByNumber(orderNumber));
    } else {
      let existingOrder: TOrder | undefined;

      if (isProfileOrder) {
        existingOrder = profileOrders.find(
          (order: TOrder) => order.number === orderNumber
        );
      } else {
        existingOrder = feedOrders.find(
          (order: TOrder) => order.number === orderNumber
        );
      }

      if (!existingOrder) {
        dispatch(getOrderByNumber(orderNumber));
      }
    }
  }, [dispatch, number, feedOrders, profileOrders, isModal, isProfileOrder]);

  const orderNumber = number ? Number(number) : null;

  const orderData =
    orderByNumber ||
    (orderNumber && isProfileOrder
      ? profileOrders.find((order: TOrder) => order.number === orderNumber)
      : feedOrders.find((order: TOrder) => order.number === orderNumber));

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item: string) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {} as TIngredientsWithCount
    );

    const ingredientsArray = Object.values(ingredientsInfo) as (TIngredient & {
      count: number;
    })[];
    const total = ingredientsArray.reduce(
      (acc: number, item: TIngredient & { count: number }) =>
        acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
