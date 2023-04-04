import { useState } from 'react';
import { fetchByName } from '../components/Api/Api';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchForm/SearchForm';
import Spinner from 'components/Loader/Loader';

const Movies = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const nameSearcQuery = searchParams.get('search') ?? '';

  const handleInputChange = e => {
    const name = e.target.value;

    if (name === '') {
      return setSearchParams({});
    }
    setSearchParams({ search: name });
    // const nextParams = name !== '' ? { searchValue: name } : {};
    // setSearchParams(nextParams);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (nameSearcQuery.trim() === '') {
      alert('Enter data in the search field!');
      return;
    }

    fetchByName(nameSearcQuery)
      .then(({ results }) => {
        setData([...results]);
      })
      .catch(error => setError(error));
    if (error) {
      setError(error);
      setStatus('rejected');
    }
    setStatus('resolved');
  };

  if (status === 'idle') {
    return (
      <SearchBar
        onSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        value={nameSearcQuery}
      />
    );
  }
  if (status === 'pending') {
    return (
      <>
        <SearchBar
          onSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          value={nameSearcQuery}
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
          value={nameSearcQuery}
        />
        <ul>
          {data.map(({ id, title, original_name }) => {
            return (
              <li key={id}>
                <Link to={`/movies/${id}`} state={{ from: location }}>
                  {title ? title : original_name}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
  if (status === 'rejected') {
    return <h2>{error}</h2>;
  }
};
export default Movies;
