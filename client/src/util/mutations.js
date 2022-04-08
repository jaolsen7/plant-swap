import { gql } from "@apollo/client";

export const CREATE_USER = gql`
mutation CreateUser($email: String!, $password: String!, $username: String!) {
  createUser(email: $email, password: $password, username: $username) {
    token
    user {
      _id
      username
      email
    }
  }
}
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        password
      }
    }
  }
`;

export const ADD_FAVORITE = gql`
mutation addFavorite($plantId: ID!) {
  addFavorite(plantId: $plantId) {
    favorites {
      _id
    }
  }
}`;

export const REMOVE_FAVORITE = gql`
mutation removeFavorite($plantId: ID!) {
  removeFavorite(plantId: $plantId) {
    favorites {
      _id
    }
  }
}`;

export const ADD_PLANT = gql`
mutation addPlant($plantDescription: String!, $plantName: String!, $plantAuthor: String!, $plantImage: String!, $zipCode: Int!) {
  addPlant(plantDescription: $plantDescription, plantName: $plantName, plantAuthor: $plantAuthor, plantImage: $plantImage, zipCode: $zipCode) {
    _id
    plantDescription
    plantName
    plantAuthor
    plantImage
    zipCode
  }
}`;

export const REMOVE_PLANT = gql`
mutation RemovePlant($plantId: ID!) {
  removePlant(plantId: $plantId) {
    _id
  }
}`;

export const ADD_COMMENT = gql`
mutation AddComment($plantId: ID!, $commentText: String!, $commentAuthor: String!) {
  addComment(plantId: $plantId, commentText: $commentText, commentAuthor: $commentAuthor) {
    _id
    plantName
    plantAuthor
    comments {
      _id
      commentText
      commentAuthor
    }
  }
}`;

export const REMOVE_COMMENT = gql`
mutation RemoveComment($plantId: ID!, $commentId: ID!) {
  removeComment(plantId: $plantId, commentId: $commentId) {
    _id
    comments {
      _id
      commentText
      commentAuthor
    }
  }
}`;