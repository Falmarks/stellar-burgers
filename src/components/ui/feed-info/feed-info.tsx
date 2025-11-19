import React, { FC, memo, useMemo } from 'react';
import styles from './feed-info.module.css';
import { FeedInfoUIProps, HalfColumnProps, TColumnProps } from './type';

const HalfColumn: FC<HalfColumnProps> = memo(({ orders, title, textColor }) => {
  const textStyle = useMemo(
    () => ({ color: textColor === 'blue' ? '#00cccc' : '#F2F2F3' }),
    [textColor]
  );

  return (
    <div className={`pr-6 ${styles.column}`}>
      <h3 className={`text text_type_main-medium ${styles.title}`}>{title}:</h3>
      <ul className={`pt-6 ${styles.list}`}>
        {orders.map((item) => (
          <li
            className={`text text_type_digits-default ${styles.list_item}`}
            style={textStyle}
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});

const Column: FC<TColumnProps> = memo(({ title, content }) => (
  <div>
    <h3 className={`pt-15 text text_type_main-medium ${styles.title}`}>
      {title}:
    </h3>
    <p className={`text text_type_digits-large ${styles.content}`}>
      {content.toLocaleString('ru-RU')}
    </p>
  </div>
));

export const FeedInfoUI: FC<FeedInfoUIProps> = memo(
  ({ feed, readyOrders, pendingOrders }) => {
    const { total, totalToday } = feed;

    return (
      <section className={styles.container}>
        <div className={styles.columns}>
          <HalfColumn orders={readyOrders} title='Готовы' textColor='blue' />
          <HalfColumn orders={pendingOrders} title='В работе' />
        </div>
        <Column title='Выполнено за все время' content={total} />
        <Column title='Выполнено за сегодня' content={totalToday} />
      </section>
    );
  }
);
