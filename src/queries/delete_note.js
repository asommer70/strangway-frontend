import gql from 'graphql-tag';

export default gql`
  mutation DeleteNote($id: Int!){
   deleteNote(id: $id) {
     id,
     name,
     content,
     folderId,
     createdAt,
     updatedAt
   }
  }
`;
