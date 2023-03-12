import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalImage } from 'components/Modal/Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, largeImageURL, tags }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalImage src={largeImageURL} alt={tags} />
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  handleKeyDown: PropTypes.func,
  handleBackdropClick: PropTypes.func,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
