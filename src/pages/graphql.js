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
// export const SEARCH = gql`
//   query songs($search: String){
//     songs(search: $search){
//       id
//       artist
//       url
//       accent
//       cover{
//         duration
//         title
//         filename_disk
//         id
//       }
//       name
//       top_track
//     }
//   }
// `