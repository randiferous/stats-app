/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNBATeams = /* GraphQL */ `
  query GetNBATeams($id: ID!) {
    getNBATeams(id: $id) {
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
export const listNBATeams = /* GraphQL */ `
  query ListNBATeams(
    $filter: ModelNBATeamsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNBATeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        teamPlace
        teamName
        division
        playedSince
        venue
        hometown
        officialURL
        abbreviation
      }
      nextToken
      __typename
    }
  }
`;
/* createdAt
updatedAt
__typename */
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
      abbreviation
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
        abbreviation
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
