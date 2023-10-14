import { gql } from "@apollo/client";

export const GET_EVENT = gql`
  query getEvent($id: ID!) {
    event(id: $id) {
      id
      title
      desc
      date
      user {
        id
        username
      }
      location {
        id
        name
      }
      participants {
        id
        user {
          id
          username
        }
      }
    }
  }
`;
