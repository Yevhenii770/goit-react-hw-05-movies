import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviews } from '../Api/Api';

const Reviews = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  console.log('ddddd', data);

  useEffect(() => {
    setLoading(true);
    fetchReviews(id)
      .then(({ results }) => {
        const reviews = results.map(el => {
          return el;
        });
        setData(reviews);
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
            {data.map(({ author, content, id }) => (
              <li key={id}>
                <p>{author}</p>
                {content && content}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No reviews found</p>
      )}
    </>
  );
};
export default Reviews;
