import React, { forwardRef, useMemo } from 'react';
import styles from './ingredients-category.module.css';
import { TIngredientsCategoryUIProps } from './type';
import { BurgerIngredient } from '@components';

export const IngredientsCategoryUI = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryUIProps
>(({ title, titleRef, ingredients, ingredientsCounters }, ref) => {
  const memoizedIngredients = useMemo(
    () =>
      ingredients.map((ingredient) => (
        <BurgerIngredient
          key={ingredient._id}
          ingredient={ingredient}
          count={ingredientsCounters[ingredient._id]}
        />
      )),
    [ingredients, ingredientsCounters]
  );

  return (
    <section className={styles.category}>
      <h3 className='text text_type_main-medium mt-10 mb-6' ref={titleRef}>
        {title}
      </h3>
      <ul className={styles.items} ref={ref}>
        {memoizedIngredients}
      </ul>
    </section>
  );
});
