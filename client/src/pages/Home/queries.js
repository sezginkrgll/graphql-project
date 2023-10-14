import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
  query getAllEvent {
    events {
      id
      title
      desc
      date
    }
  }
`;
