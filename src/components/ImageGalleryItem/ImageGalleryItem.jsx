import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import { Image } from 'components/ImageGalleryItem/ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  image: { largeImageURL, webformatURL, tags },
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Image onClick={toggleModal} src={webformatURL} alt={tags} />
      {isOpen && (
        <Modal
          onClose={toggleModal}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
