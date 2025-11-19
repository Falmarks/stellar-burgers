import React, { FC, memo } from 'react';
import styles from './preloader.module.css';

export const Preloader: FC = memo(() => (
  <div className={styles.preloader} role='status' aria-label='Загрузка'>
    <div className={styles.preloader_circle} />
  </div>
));
