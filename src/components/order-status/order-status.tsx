import React, { FC, useMemo } from 'react';
import { OrderStatusProps } from './type';
import { OrderStatusUI } from '@ui';

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  const { color, text } = useMemo(() => {
    switch (status) {
      case 'pending':
        return { color: '#E52B1A', text: 'Готовится' };
      case 'done':
        return { color: '#00CCCC', text: 'Выполнен' };
      default:
        return { color: '#F2F2F3', text: 'Создан' };
    }
  }, [status]);

  return <OrderStatusUI textStyle={color} text={text} />;
};
