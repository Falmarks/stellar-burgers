import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeed } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.feed.orders);
  const isLoading = useSelector((state) => state.feed.isLoading);

  const handleFeedUpdate = useCallback(() => {
    dispatch(getFeed());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  if (isLoading || !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleFeedUpdate} />;
};
