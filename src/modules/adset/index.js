import { queryResolver } from "../../utils/query";

export const resolvers = {
  Query: {
    adset: queryResolver("adset")
  },
  Mutation: {
    mock: () => null
  }
};
