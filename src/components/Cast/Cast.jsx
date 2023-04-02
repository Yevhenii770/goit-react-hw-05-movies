import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCast } from '../Api/Api';
import userImg from '../../img/no-poster-available.jpg';

const Cast = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchCast(id)
      .then(({ cast }) => {
        const newCast = cast.map(el => {
          return el;
        });
        setData(newCast);
      })
      .catch(error => console.log(error));
    setLoading(false);
  }, [id]);

  return (
    <>
      {loading ? (
        'Loading...'
      ) : data && data.length > 0 ? (
        <div>
          <ul>
            {data.map(({ name, character, profile_path, id }) => (
              <li key={id}>
                {profile_path ? (
                  <img
                    alt={name}
                    src={`https://image.tmdb.org/t/p/w92${profile_path}`}
                  />
                ) : (
                  <img alt={name} src={userImg} />
                )}

                <p>{name}</p>
                <p>{character}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No data found</p>
      )}
    </>
  );
};
export default Cast;
