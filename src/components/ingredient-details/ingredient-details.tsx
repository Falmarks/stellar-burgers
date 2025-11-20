import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import styles from './ingredient-details.module.css';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredients = useSelector(
    (state) => state.burgerIngredients.ingredients
  );

  const ingredientData = useMemo(
    () => ingredients.find((item) => item._id === id),
    [ingredients, id]
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <div className={styles.container}>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </div>
  );
};
