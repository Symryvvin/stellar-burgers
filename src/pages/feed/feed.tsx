import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  errorSelector,
  feedSelector,
  statusSelector,
  getFeed
} from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const feed = useSelector(feedSelector);
  const error = useSelector(errorSelector);
  const status = useSelector(statusSelector);

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  if (status === 'loading') {
    return <Preloader />;
  }

  if (status === 'error') {
    return <div>Ошибка: {error}</div>;
  }

  if (!feed || !feed.orders.length) {
    return <div>Заказы не найдены</div>;
  }

  return (
    <FeedUI orders={feed.orders} handleGetFeeds={() => dispatch(getFeed())} />
  );
};
