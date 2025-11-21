import { FC, useMemo } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useSelector((state) => state.feed.orders);
  const total = useSelector((state) => state.feed.total);
  const totalToday = useSelector((state) => state.feed.totalToday);

  const readyOrders = useMemo(() => getOrders(orders, 'done'), [orders]);

  const pendingOrders = useMemo(() => getOrders(orders, 'pending'), [orders]);

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      total={total}
      totalToday={totalToday}
    />
  );
};
