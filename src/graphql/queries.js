/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTeams = /* GraphQL */ `
  query GetTeams($id: ID!) {
    getTeams(id: $id) {
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
export const listTeams = /* GraphQL */ `
  query ListTeams(
    $filter: ModelTeamsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
