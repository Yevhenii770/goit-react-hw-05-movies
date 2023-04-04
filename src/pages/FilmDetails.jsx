import { useEffect, useState, useRef } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { fetchById } from '../components/Api/Api';
import { Link } from 'react-router-dom';
import noMovieImg from '../img/no-poster-available.jpg';
import Spinner from '../components/Loader/Loader';

const FilmDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const location = useLocation();
  const baclLink = useRef(location.state?.from ?? '/home');
  useEffect(() => {
    setStatus('pending');
    fetchById(id)
      .then(
        ({
          poster_path,
          release_date,
          original_title,
          overview,
          vote_average,
          genres,
        }) => {
          setData({
            poster_path,
            release_date,
            original_title,
            overview,
            vote_average,
            genres,
          });
          setStatus('resolved');
        }
      )
      .catch(error => setError(error));
    if (error) {
      setStatus('rejected');
    }
  }, [id, error]);

  const getGenres = arrGenres => {
    if (arrGenres) {
      return arrGenres.map(genre => genre.name).join(', ');
    }
  };

  const getYear = releaseDate => {
    const date = new Date(releaseDate);
    if (date === 'Invalid Date') {
      return 'Sorry, we dont have any date for you :(';
    }
    if (date) {
      return date.getFullYear();
    }
  };
  if (status === 'idle') {
    return <></>;
  }
  if (status === 'pending') {
    return (
      <>
        <Spinner />
      </>
    );
  }
  if (status === 'resolved') {
    return (
      <>
        <div>
          <Link to={baclLink.current}>Go Back</Link>
        </div>
        <div>
          {data.original_title ? (
            <img
              alt={data.original_title}
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            />
          ) : (
            <img src={noMovieImg} alt="not available" />
          )}

          <div>
            <h1>
              {data.original_title} {getYear(data.release_date)}
            </h1>
            <p>User Score: {~~(data.vote_average * 10)}%</p>
            <p>Overview</p>
            <p>{data.overview}</p>
            <p>Genres</p>
            <p>{getGenres(data.genres)}</p>
          </div>
        </div>
        <div>
          <ul>
            <li>
              <Link to="cast">
                <button>Cast</button>
              </Link>
            </li>
            <li>
              <Link to="reviews">
                <button>Reviews</button>
              </Link>
            </li>
          </ul>
          <Outlet />
        </div>
      </>
    );
  }
  if (status === 'idle') {
    return <></>;
  }
};

export default FilmDetails;
