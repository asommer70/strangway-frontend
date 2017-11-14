import gql from 'graphql-tag';

export default gql`
  mutation CreateNote($name: String!){
   addFolder(name: $name) {
     id,
     name
   }
  }
`;
