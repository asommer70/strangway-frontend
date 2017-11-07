import gql from 'graphql-tag';

export default gql`
  mutation CreateNote($name: String!, $content: String, $folderId: Int){
   addNote(name: $name, content: $content, folderId: $folderId) {
     id,
     name,
     content,
     folderId,
     createdAt,
     updatedAt
   }
  }
`;
