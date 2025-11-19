import React, { FC, memo, useMemo } from 'react';
import styles from './ingredient-details.module.css';
import { IngredientDetailsUIProps } from './type';

export const IngredientDetailsUI: FC<IngredientDetailsUIProps> = memo(
  ({ ingredientData }) => {
    const { name, image_large, calories, proteins, fat, carbohydrates } =
      ingredientData;

    const nutritionalValues = useMemo(
      () => [
        { label: 'Калории, ккал', value: calories },
        { label: 'Белки, г', value: proteins },
        { label: 'Жиры, г', value: fat },
        { label: 'Углеводы, г', value: carbohydrates }
      ],
      [calories, proteins, fat, carbohydrates]
    );

    return (
      <div className={styles.content}>
        <img
          className={styles.img}
          alt={`Изображение ${name}`}
          src={image_large}
        />
        <h3 className='text text_type_main-medium mt-2 mb-4'>{name}</h3>
        <ul className={`${styles.nutritional_values} text_type_main-default`}>
          {nutritionalValues.map((item) => (
            <li key={item.label} className={styles.nutritional_value}>
              <p className={`text mb-2 ${styles.text}`}>{item.label}</p>
              <p className='text text_type_digits-default'>{item.value}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
