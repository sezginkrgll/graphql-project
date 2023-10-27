import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query getAllUsers {
    users {
      id
      username
    }
  }
`;

export const GET_LOCATIONS = gql`
  query getAllLocations {
    locations {
      id
      name
    }
  }
`;

export const CREATE_EVENT_MUTATION = gql`
  mutation addEvent($data: CreateEventInput!) {
    createEvent(data: $data) {
      id
    }
  }
`;
