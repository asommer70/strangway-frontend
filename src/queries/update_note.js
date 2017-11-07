import gql from 'graphql-tag';

export default gql`
  mutation UpdateNote($id: Int, $name: String, $content: String, $folderId: Int){
   editNote(id: $id, name: $name, content: $content, folderId: $folderId) {
     id,
     name,
     content,
     folderId,
     createdAt,
     updatedAt
   }
  }
`;
