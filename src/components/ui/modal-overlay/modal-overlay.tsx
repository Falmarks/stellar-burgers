import { FC, memo, useCallback } from 'react';
import styles from './modal-overlay.module.css';

interface ModalOverlayUIProps {
  onClick: () => void;
}

export const ModalOverlayUI: FC<ModalOverlayUIProps> = memo(({ onClick }) => {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <div
      className={styles.overlay}
      onClick={handleClick}
      role='presentation'
      aria-hidden='true'
    />
  );
});
