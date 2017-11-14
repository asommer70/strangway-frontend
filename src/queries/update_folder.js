import gql from 'graphql-tag';

export default gql`
  mutation UpdateFolder($id: Int!, $name: String){
   editNote(id: $id, name: $name) {
     id,
     name
   }
  }
`;
