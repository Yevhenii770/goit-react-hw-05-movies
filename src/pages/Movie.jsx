import { useState } from 'react';
import { fetchByName } from '../components/Api/Api';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchForm/SearchForm';
import Spinner from 'components/Loader/Loader';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const handleInputChange = e => {
    setSearchQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      alert('Enter data in the search field!');
      return;
    }

    fetchByName(searchQuery)
      .then(({ results }) => {
        setData([...results]);
      })
      .catch(error => setError(error));
    if (error) {
      setStatus('rejected');
    }
    setStatus('resolved');
  };

  if (status === 'idle') {
    return (
      <SearchBar
        onSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        searchQuery={searchQuery}
      />
    );
  }
  if (status === 'pending') {
    return (
      <>
        <SearchBar
          onSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          searchQuery={searchQuery}
        />
        <Spinner />
      </>
    );
  }
  if (status === 'resolved') {
    return (
      <>
        <SearchBar
          onSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          searchQuery={searchQuery}
        />
        <ul>
          {data.map(({ id, title, original_name }) => {
            return (
              <li key={id}>
                <Link to={`/movies/${id}`}>
                  {title ? title : original_name}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
};
export default Movies;
