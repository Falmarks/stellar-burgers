import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeed } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.feed.orders);
  const handleFeedUpdate = () => {
    dispatch(getFeed());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleFeedUpdate} />;
};
