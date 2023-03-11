import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
import {
  Header,
  Form,
  Button,
  Span,
  Input,
} from 'components/Searchbar/Searchbar.styled';

export const Searchbar = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const handleChange = ({ target: { value } }) => {
    setValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!value.trim()) {
      toast.error('The search field is empty!');
      return;
    }

    onSearch(value);
    setValue('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <BsSearch />
          <Span>Search</Span>
        </Button>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
