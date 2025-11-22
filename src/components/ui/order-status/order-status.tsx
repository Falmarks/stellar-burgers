import React, { FC, memo } from 'react';
import { OrderStatusUIProps } from './type';

export const OrderStatusUI: FC<OrderStatusUIProps> = memo(
  ({ textStyle, text }) => (
    <span
      className='text text_type_main-default pt-2'
      style={{ color: textStyle }}
      aria-label={`Статус заказа: ${text}`}
    >
      {text}
    </span>
  )
);
