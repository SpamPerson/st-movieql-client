import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

const ALL_MOVIES = gql`
   query getMovies {
      allMovies {
         id
         title
         small_cover_image
      }
   }
`;

const Movies: React.FC = () => {
   const { data, loading, error } = useQuery(ALL_MOVIES);

   if (loading) {
      return <h1>Loading...</h1>;
   }

   if (error) {
      return <h1>Could not fetch :(</h1>;
   }

   return (
      <div style={{ textAlign: 'center' }}>
         <h1 style={{ padding: '50px' }}>Movies</h1>
         <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 50 }}>
            {data.allMovies.map((movie: any) => (
               <Link title={movie.title} to={`/movies/${movie.id}`} >
                  <li key={movie.id} style={{ display: 'flex', flexDirection: 'column' }}>
                     <img src={movie.small_cover_image as string} width={'100%'} height={'100%'} />
                  </li>
               </Link>
            ))}
         </ul>
      </div>
   );
};

export default Movies;
