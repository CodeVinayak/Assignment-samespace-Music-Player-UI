import { gql } from '@apollo/client';

// Query to fetch all songs
export const GET_SONGS = gql`
  query songs{
    songs{
    id
    artist
    url
    accent
    name
    top_track
    cover{
        id
    }
    }
}
`;