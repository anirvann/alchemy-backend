import { queryResolver } from "../../utils/query";

export const resolvers = {
  Query: {
    campaign: queryResolver("campaign")
  },
  Mutation: {
    mock: () => null
  }
};
