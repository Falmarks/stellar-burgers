import { FC, memo } from 'react';
import styles from './orders-list.module.css';
import { OrdersListProps } from './type';
import { OrderCard } from '@components';
import { TOrder } from '@utils-types';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className={styles.content}>
      {orderByDate.map((order: TOrder, index: number) => (
        <OrderCard order={order} key={`${order._id}-${index}`} />
      ))}
    </div>
  );
});
