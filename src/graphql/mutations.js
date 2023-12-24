/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNBATeams = /* GraphQL */ `
  mutation CreateNBATeams(
    $input: CreateNBATeamsInput!
    $condition: ModelNBATeamsConditionInput
  ) {
    createNBATeams(input: $input, condition: $condition) {
      id
      teamPlace
      teamName
      division
      playedSince
      venue
      hometown
      officialURL
      abbreviation
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateNBATeams = /* GraphQL */ `
  mutation UpdateNBATeams(
    $input: UpdateNBATeamsInput!
    $condition: ModelNBATeamsConditionInput
  ) {
    updateNBATeams(input: $input, condition: $condition) {
      id
      teamPlace
      teamName
      division
      playedSince
      venue
      hometown
      officialURL
      abbreviation
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteNBATeams = /* GraphQL */ `
  mutation DeleteNBATeams(
    $input: DeleteNBATeamsInput!
    $condition: ModelNBATeamsConditionInput
  ) {
    deleteNBATeams(input: $input, condition: $condition) {
      id
      teamPlace
      teamName
      division
      playedSince
      venue
      hometown
      officialURL
      abbreviation
      createdAt
      updatedAt
      __typename
    }
  }
`;
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
      abbreviation
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
      abbreviation
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
      abbreviation
      createdAt
      updatedAt
      __typename
    }
  }
`;
