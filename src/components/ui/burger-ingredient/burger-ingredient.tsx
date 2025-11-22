import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import {
  Counter,
  CurrencyIcon,
  AddButton
} from '@zlden/react-developer-burger-ui-components';
import styles from './burger-ingredient.module.css';
import { TBurgerIngredientUIProps } from './type';

export const BurgerIngredientUI: FC<TBurgerIngredientUIProps> = memo(
  ({ ingredient, count, handleAdd, locationState }) => {
    const { image, price, name, _id } = ingredient;

    const formattedPrice = price.toLocaleString('ru-RU');

    return (
      <li className={styles.container} data-testid={`ingredient-${_id}`}>
        <Link
          className={styles.article}
          to={`/ingredients/${_id}`}
          state={locationState}
        >
          {count && <Counter count={count} />}
          <img
            className={styles.img}
            src={image}
            alt={`Изображение ${name}`}
            data-testid='ingredient-image'
          />
          <div className={`${styles.cost} mt-2 mb-2`}>
            <p className='text text_type_digits-default mr-2'>
              {formattedPrice}
            </p>
            <CurrencyIcon type='primary' />
          </div>
          <p
            className={`text text_type_main-default ${styles.text}`}
            data-testid='ingredient-name'
          >
            {name}
          </p>
        </Link>
        <AddButton
          text='Добавить'
          onClick={handleAdd}
          extraClass={`${styles.addButton} mt-8`}
          data-testid='add-ingredient-button'
        />
      </li>
    );
  }
);
