import { gql } from "@apollo/client";

export const ME = gql`
query Me {
  me {
    _id
    username
    email
    plants {
      _id
      plantDescription
      plantName
      plantAuthor
      plantImage
      zipCode
      comments {
        _id
        commentText
        commentAuthor
      }
    }
  }
}
`;

export const QUERY_FAVORITES = gql`
query MyFavorites {
  me {
    favorites {
      _id
      plantDescription
      plantName
      plantAuthor
      plantImage
      zipCode
      comments {
        _id
        commentText
        commentAuthor
      }
    }
  }
}
`;

export const QUERY_USER = gql`
query User($username: String!) {
  user(username: $username) {
    _id
    username
    email
    plants {
      _id
      plantDescription
      plantName
      plantAuthor
      plantImage
      zipCode
    }
    favorites {
      _id
    }
  }
}
`;

export const QUERY_USERS = gql`
query Users {
  users {
    _id
    username
    email
    plants {
      _id
      plantDescription
      plantName
      plantAuthor
      plantImage
      zipCode
      comments {
        _id
        commentText
        commentAuthor
      }
    }
  }
}
`;

export const QUERY_PLANTS = gql`
query Plants {
  plants {
    _id
    plantDescription
    plantName
    plantAuthor
    plantImage
    zipCode
  }
}
`;

export const QUERY_PLANT = gql`
query Plant($plantId: ID!) {
  plant(plantId: $plantId) {
    _id
    plantName
  plantDescription
    plantAuthor
    plantImage
    zipCode
    comments {
      _id
      commentText
      commentAuthor
    }
  }
}
`;

export const QUERY_PLANT_BY_ZIPCODE = gql`
query PlantsByZipcode($zipCode: Int!) {
  plantsByZipcode(zipCode: $zipCode) {
    _id
    plantDescription
    plantName
    plantAuthor
    plantImage
    zipCode
  }
}
`;