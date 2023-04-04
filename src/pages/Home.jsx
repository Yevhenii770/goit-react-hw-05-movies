import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchHome } from '../components/Api/Api';

const Home = () => {
  const [trending, setTrending] = useState([]);
  const location = useLocation();
  useEffect(() => {
    fetchHome()
      .then(({ results }) => {
        const trendingToday = results.map(
          ({ id, title, overview, original_name }) => {
            return { id, title, overview, original_name };
          }
        );
        setTrending([...trendingToday]);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h2>Trending today</h2>
      <ul>
        {trending.map(({ id, title, original_name }) => {
          return (
            <li key={id}>
              <Link to={`/movies/${id}`} state={{ from: location }}>
                {title ? title : original_name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Home;
