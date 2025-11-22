import { FC, memo, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';
import { useSelector } from '../../services/store';
import styles from './order-card.module.css';

const maxIngredients = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location = useLocation();
  const ingredients = useSelector(
    (state) => state.burgerIngredients.ingredients
  );

  const orderInfo = useMemo(() => {
    if (!ingredients.length) return null;

    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredient[], item: string) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) return [...acc, ingredient];
        return acc;
      },
      []
    );

    const total = ingredientsInfo.reduce((acc, item) => acc + item.price, 0);

    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);

    const remains =
      ingredientsInfo.length > maxIngredients
        ? ingredientsInfo.length - maxIngredients
        : 0;

    const date = new Date(order.createdAt);

    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date
    };
  }, [order, ingredients]);

  if (!orderInfo) return null;

  const getOrderPath = () => {
    if (location.pathname.includes('/profile/orders')) {
      return `/profile/orders/${order.number}`;
    }
    return `/feed/${order.number}`;
  };

  return (
    <Link
      to={getOrderPath()}
      state={{ background: location }}
      className={styles.link}
    >
      <OrderCardUI orderInfo={orderInfo} maxIngredients={maxIngredients} />
    </Link>
  );
});
