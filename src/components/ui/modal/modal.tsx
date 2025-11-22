import { FC, memo, useCallback } from 'react';
import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import styles from './modal.module.css';
import { TModalUIProps } from './type';
import { ModalOverlayUI } from '@ui';

export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, children }) => {
    const handleButtonClick = useCallback(() => {
      onClose();
    }, [onClose]);

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      },
      [onClose]
    );

    return (
      <>
        <div
          className={styles.modal}
          role='dialog'
          aria-modal='true'
          aria-labelledby={title ? 'modal-title' : undefined}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          data-testid='modal'
        >
          <div className={styles.header}>
            {title && (
              <h3
                id='modal-title'
                className={`${styles.title} text text_type_main-large`}
                data-testid='modal-title'
              >
                {title}
              </h3>
            )}
            <button
              className={styles.button}
              type='button'
              onClick={handleButtonClick}
              aria-label='Закрыть модальное окно'
              data-testid='modal-close-button'
            >
              <CloseIcon type='primary' />
            </button>
          </div>
          <div className={styles.content} data-testid='modal-content'>
            {children}
          </div>
        </div>
        <ModalOverlayUI onClick={onClose} />
      </>
    );
  }
);
