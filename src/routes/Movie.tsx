import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

const GET_MOVIE = gql`
   query getMovie($movieId: String!) {
      movie(id: $movieId) {
         id
         title
         medium_cover_image
         rating
         isLiked @client
      }
   }
`;

const Movie: React.FC = () => {
   const { id } = useParams();
   const {
      data,
      loading,
      error,
      client: { cache },
   } = useQuery(GET_MOVIE, {
      variables: {
         movieId: id,
      },
   });

   if (loading) {
      return <h1>Fetching movie...</h1>;
   }

   if (error) {
      return <h1>Could not fetch :(</h1>;
   }

   const onClick = () => {
      cache.writeFragment({
         id: `Movie:${id}`,
         fragment: gql`
            fragment MovieFragment on Movie {
               isLiked
            }
         `,
         data: {
            isLiked: !data.movie.isLiked,
         },
      });
   };

   return (
      <div style={{ width: '100%', height: '100%' }}>
         <div style={{ textAlign: 'center' }}>
            <img src={data.movie.medium_cover_image} width={'100%'} height={'100%'} />
         </div>
         <div style={{ textAlign: 'center' }}>
            <h1>{data.movie.title}</h1>
            <h2>평점 : {data.movie.rating}</h2>
            <button onClick={onClick}>{data.movie.isLiked ? 'unlike' : 'Like'}</button>
         </div>
      </div>
   );
};

export default Movie;
