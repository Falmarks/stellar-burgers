import React, { FC, memo, useMemo } from 'react';
import { Tab } from '@zlden/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { BurgerIngredientsUIProps } from './type';
import { IngredientsCategory } from '@components';

export const BurgerIngredientsUI: FC<BurgerIngredientsUIProps> = memo(
  ({
    currentTab,
    buns,
    mains,
    sauces,
    titleBunRef,
    titleMainRef,
    titleSaucesRef,
    bunsRef,
    mainsRef,
    saucesRef,
    onTabClick
  }) => {
    const tabConfig = useMemo(
      () => [
        { value: 'bun', label: 'Булки', active: currentTab === 'bun' },
        { value: 'main', label: 'Начинки', active: currentTab === 'main' },
        { value: 'sauce', label: 'Соусы', active: currentTab === 'sauce' }
      ],
      [currentTab]
    );

    const categoryConfig = useMemo(
      () => [
        {
          title: 'Булки',
          titleRef: titleBunRef,
          ingredients: buns,
          ref: bunsRef
        },
        {
          title: 'Начинки',
          titleRef: titleMainRef,
          ingredients: mains,
          ref: mainsRef
        },
        {
          title: 'Соусы',
          titleRef: titleSaucesRef,
          ingredients: sauces,
          ref: saucesRef
        }
      ],
      [
        buns,
        mains,
        sauces,
        titleBunRef,
        titleMainRef,
        titleSaucesRef,
        bunsRef,
        mainsRef,
        saucesRef
      ]
    );

    return (
      <section
        className={styles.burger_ingredients}
        data-testid='burger-ingredients'
      >
        <nav>
          <ul className={styles.menu}>
            {tabConfig.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                active={tab.active}
                onClick={onTabClick}
              >
                {tab.label}
              </Tab>
            ))}
          </ul>
        </nav>
        <div className={styles.content} data-testid='ingredients-list'>
          {categoryConfig.map((category) => (
            <IngredientsCategory
              key={category.title}
              title={category.title}
              titleRef={category.titleRef}
              ingredients={category.ingredients}
              ref={category.ref}
            />
          ))}
        </div>
      </section>
    );
  }
);
