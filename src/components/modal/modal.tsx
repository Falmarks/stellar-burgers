import { FC, memo, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useParams } from 'react-router-dom';
import { TModalProps } from './type';
import { ModalUI } from '@ui';

const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = memo(({ title, onClose, children }) => {
  const { number } = useParams();

  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [handleEsc]);

  const modalTitle = number ? `#${number}` : title;

  return ReactDOM.createPortal(
    <ModalUI title={modalTitle} onClose={onClose}>
      {children}
    </ModalUI>,
    modalRoot as HTMLDivElement
  );
});
