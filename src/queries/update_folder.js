import gql from 'graphql-tag';

export default gql`
  mutation UpdateFolder($id: Int!, $name: String!){
   editFolder(id: $id, name: $name) {
     id,
     name
   }
  }
`;
