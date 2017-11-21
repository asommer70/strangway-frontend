import gql from 'graphql-tag';

export default gql`
{
  logout {
    id,
    username
  }
}
`;
