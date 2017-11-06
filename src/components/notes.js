import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

let folderId;

class Notes extends Component {
  constructor(props) {
    super(props);

    console.log('props:', props);
    folderId = props.folder.id;
  }

  componentWillReceiveProps(props) {
    // folderId = props.folder.id;

    this.setState({
      notes: props.data.notes,
      selectedNote: props.data.notes[0] || {}
    });
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading Notes...</div>;
    }

    return (
      <div>
        {
          this.state.notes.map((note) => {
            return <div key={note.id}>{note.name}</div>
          })
        }
      </div>
    )
  }
}

// TODO:as need to figure out how to query on this.props.folder.id.
const noteQuery = gql`
  {
    folder(id: $folderId) {
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

// type NoteData =  {
//   id: integer,
//   name: string,
//   content: string,
//   folderId: integer,
//   createdAt: string,
//   updatedAt: string
// };

// const mapDataToProps = ({data}: {data: NoteData}) => {
//   console.log('data:', data);
//     const isLoading = data.loading;
//     const isEmpty = !!data.folder.notes && data.folder.notes.length === 0;
//     const isError = !!data.error;
//     const notes = data.folder.notes || [];
//
//     return {isLoading, isEmpty, isError, folder};
// };

// const mapPropsToOptions = ({folderId}) => ({variables: {folderId}});
//
// export default graphql(noteQuery, {
//     options: mapPropsToOptions,
//     // props: mapDataToProps,
// })(Notes);

export default graphql(noteQuery, { options: { variables: { folderId: folderId } } })(Notes);
