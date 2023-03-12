import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { getImages } from 'services/getApp';
import { Loader } from 'components/Loader/Loader';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { List, Item } from 'components/ImageGallery/ImageGallery.styled';

export const ImageGallery = ({ textSearch, handleLoad, page }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [more, setMore] = useState(false);
  const [perPage, setPerPage] = useState(12);

  useEffect(() => {
    if (!textSearch.trim()) {
      return;
    }

    getImages(textSearch, page, perPage)
      .then(images => {
        if (page === 1) {
          toast.success(`We found ${images.totalHits} images`);
          setImages([...images.hits]);
        } else {
          setImages(prevState => [...prevState, ...images.hits]);
        }

        if (images.hits.length === perPage) {
          setMore(true);
          setPerPage(perPage);
        }

        if (images.totalHits <= page * perPage) {
          toast.error(`You reached end of search results`);
          setMore(false);
        }
      })
      .catch(error => console.log(error.message))
      .finally(() => {
        setLoading(false);
      });
  }, [textSearch, page, perPage]);

  return (
    <>
      {loading && <Loader visible={loading} />}
      {images && (
        <List>
          {images.map(image => (
            <Item key={image.id}>
              <ImageGalleryItem image={image} />
            </Item>
          ))}
        </List>
      )}

      {more && <Button onClick={handleLoad} />}
    </>
  );
};

ImageGallery.propTypes = {
  textSearch: PropTypes.string.isRequired,
  page: PropTypes.number,
  handleLoad: PropTypes.func,
};
