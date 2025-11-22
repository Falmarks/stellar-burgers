import React, { FC, memo } from 'react';
import styles from './order-details.module.css';
import doneImg from '../../../images/done.svg';
import { OrderDetailsUIProps } from './type';

export const OrderDetailsUI: FC<OrderDetailsUIProps> = memo(
  ({ orderNumber }) => {
    const formattedOrderNumber = orderNumber.toLocaleString('ru-RU');

    return (
      <div className={styles.container}>
        <h2 className={`${styles.title} text text_type_digits-large mt-2 mb-4`}>
          {formattedOrderNumber}
        </h2>
        <p className='text text_type_main-medium'>идентификатор заказа</p>
        <img className={styles.img} src={doneImg} alt='Заказ принят' />
        <p className='text text_type_main-default mb-1'>
          Ваш заказ начали готовить
        </p>
        <p className={`${styles.text} text text_type_main-default`}>
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    );
  }
);
