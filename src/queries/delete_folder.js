import gql from 'graphql-tag';

export default gql`
  mutation DeleteFolder($id: Int!){
   deleteFolder(id: $id) {
     id,
     name
   }
  }
`;
