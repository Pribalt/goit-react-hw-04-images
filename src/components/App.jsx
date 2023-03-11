import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { GlobalStyle } from 'components/GlobalStyle';
import { AppStyled } from 'components/App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export const App = () => {
  const [textSearch, setTextSearch] = useState('');
  const [page, setPage] = useState(1);

  const handleSubmit = textSearch => {
    setTextSearch(textSearch);
    setPage(1);
  };

  const handleLoad = () => {
    setPage(page + 1);
  };

  return (
    <AppStyled>
      <GlobalStyle />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
        }}
      />
      <Searchbar onSearch={handleSubmit} />
      <ImageGallery
        textSearch={textSearch}
        handleLoad={handleLoad}
        page={page}
      />
    </AppStyled>
  );
};
