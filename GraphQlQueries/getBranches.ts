import { gql } from "@apollo/client";

export const GET_BRANCHES = gql`
  query QueryForBranchManager($where: BranchManagerFilterInput) {
    queryForBranchManager(where: $where) {
      branch {
        name
        location
        websiteUrl
        id
      }
      manager {
        name
      }
    }
  }
`;
