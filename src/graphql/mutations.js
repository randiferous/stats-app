/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTeams = /* GraphQL */ `
  mutation CreateTeams(
    $input: CreateTeamsInput!
    $condition: ModelTeamsConditionInput
  ) {
    createTeams(input: $input, condition: $condition) {
      id
      teamName
      division
      playedSince
      venue
      hometown
      officialURL
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTeams = /* GraphQL */ `
  mutation UpdateTeams(
    $input: UpdateTeamsInput!
    $condition: ModelTeamsConditionInput
  ) {
    updateTeams(input: $input, condition: $condition) {
      id
      teamName
      division
      playedSince
      venue
      hometown
      officialURL
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTeams = /* GraphQL */ `
  mutation DeleteTeams(
    $input: DeleteTeamsInput!
    $condition: ModelTeamsConditionInput
  ) {
    deleteTeams(input: $input, condition: $condition) {
      id
      teamName
      division
      playedSince
      venue
      hometown
      officialURL
      createdAt
      updatedAt
      __typename
    }
  }
`;
