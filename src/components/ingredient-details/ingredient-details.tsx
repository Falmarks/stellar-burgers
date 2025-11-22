import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import styles from './ingredient-details.module.css';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const ingredients = useSelector(
    (state) => state.burgerIngredients.ingredients
  );

  const ingredientData = useMemo(
    () => ingredients.find((item) => item._id === id),
    [ingredients, id]
  );

  // Проверяем, открыт ли компонент в модальном окне
  const isModal = location.state?.background;

  if (!ingredientData) {
    return (
      <div className={isModal ? '' : styles.pageContainer}>
        <Preloader />
      </div>
    );
  }

  // Для модального окна возвращаем только содержимое
  if (isModal) {
    return <IngredientDetailsUI ingredientData={ingredientData} />;
  }

  // Для отдельной страницы возвращаем с контейнером и заголовком
  return (
    <div className={styles.pageContainer}>
      <h1 className={`${styles.title} text text_type_main-large`}>
        Детали ингредиента
      </h1>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </div>
  );
};
