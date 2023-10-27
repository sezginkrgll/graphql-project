import { gql } from "@apollo/client";

export const GET_EVENT = gql`
  query getEvent($id: ID!) {
    event(id: $id) {
      id
      title
      desc
      date
      from
      to
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

export const PARTICIPANTS_SUBSCRIPTION = gql`
  subscription ParticipantCreated($event_id: ID) {
    participantCreated(event_id: $event_id) {
      id
      user {
        id
        username
      }
    }
  }
`;
