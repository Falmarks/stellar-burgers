import React, { FC, memo, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  CurrencyIcon,
  FormattedDate
} from '@zlden/react-developer-burger-ui-components';
import styles from './order-card.module.css';
import { OrderCardUIProps } from './type';
import { OrderStatus } from '@components';

export const OrderCardUI: FC<OrderCardUIProps> = memo(
  ({ orderInfo, maxIngredients, locationState }) => {
    const location = useLocation();
    const isProfileOrders = location.pathname === '/profile/orders';

    const formattedNumber = useMemo(
      () => `#${String(orderInfo.number).padStart(6, '0')}`,
      [orderInfo.number]
    );

    const formattedTotal = useMemo(
      () => orderInfo.total.toLocaleString('ru-RU'),
      [orderInfo.total]
    );

    const ingredientsWithStyles = useMemo(
      () =>
        orderInfo.ingredientsToShow.map((ingredient, index) => {
          const zIndex = maxIngredients - index;
          const right = 20 * index;
          const isLast = index === maxIngredients - 1;
          const hasRemains = orderInfo.remains > 0 && isLast;

          return {
            ingredient,
            zIndex,
            right,
            isLast,
            hasRemains,
            opacity: hasRemains ? 0.5 : 1
          };
        }),
      [orderInfo.ingredientsToShow, orderInfo.remains, maxIngredients]
    );

    return (
      <Link
        to={orderInfo.number.toString()}
        relative='path'
        state={locationState}
        className={`p-6 mb-4 mr-2 ${styles.order}`}
      >
        <div className={styles.order_info}>
          <span className={`text text_type_digits-default ${styles.number}`}>
            {formattedNumber}
          </span>
          <span className='text text_type_main-default text_color_inactive'>
            <FormattedDate date={orderInfo.date} />
          </span>
        </div>
        <h4 className={`pt-6 text text_type_main-medium ${styles.order_name}`}>
          {orderInfo.name}
        </h4>
        {isProfileOrders && <OrderStatus status={orderInfo.status} />}
        <div className={`pt-6 ${styles.order_content}`}>
          <ul className={styles.ingredients}>
            {ingredientsWithStyles.map((item, index) => (
              <li
                className={styles.img_wrap}
                style={{ zIndex: item.zIndex, right: item.right }}
                key={`${item.ingredient._id}-${index}`}
              >
                <img
                  style={{ opacity: item.opacity }}
                  className={styles.img}
                  src={item.ingredient.image_mobile}
                  alt={item.ingredient.name}
                />
                {item.isLast && item.hasRemains && (
                  <span
                    className={`text text_type_digits-default ${styles.remains}`}
                  >
                    +{orderInfo.remains}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <div className={styles.total}>
            <span
              className={`text text_type_digits-default pr-1 ${styles.order_total}`}
            >
              {formattedTotal}
            </span>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </Link>
    );
  }
);
