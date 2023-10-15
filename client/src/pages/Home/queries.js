import { gql } from "@apollo/client";

const eventFragment = gql`
  fragment EventsFragment on Event {
    id
    title
    desc
    date
  }
`;

export const GET_EVENTS = gql`
  query getAllEvent {
    events {
      ...EventsFragment
    }
  }
  ${eventFragment}
`;

export const EVENTS_SUBSCRIPTION = gql`
  subscription {
    eventCreated {
      ...EventsFragment
    }
  }
  ${eventFragment}
`;
