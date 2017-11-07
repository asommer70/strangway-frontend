import gql from 'graphql-tag';

export default gql`
  query FolderQuery($id: Int){
    folder(id: $id) {
      id,
      name,
      notes {
        id,
        name,
        content,
        folderId,
        createdAt,
        updatedAt
      }
    }
  }
`;
