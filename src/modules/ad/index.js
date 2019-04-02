import { queryResolver } from "../../utils/query";

export const resolvers = {
  Query: {
    ad: queryResolver("ad")
  },
  Mutation: {
    mock: () => null
  }
};
