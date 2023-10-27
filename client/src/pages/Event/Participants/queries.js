import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query getAllUsers {
    users {
      id
      username
    }
  }
`;

export const CREATE_PARTICIPANT_MUTATION = gql`
  mutation addParticipant($data: CreateParticipantInput!) {
    createParticipant(data: $data) {
      id
    }
  }
`;
