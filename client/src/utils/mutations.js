import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
mutation SaveBook($title: String!, $authors: [String], $bookId: String!, $description: String, $image: String, $link: String) {
  saveBook(title: $title, authors: $authors, bookId: $bookId, description: $description, image: $image, link: $link) {
    _id
    email
    username
    bookCount
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
  }
}
`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      bookCount
      email
      username
      savedbooks {
        bookId
        authors
        description
        image
        link
        title
      }
    }
  }
  
`;