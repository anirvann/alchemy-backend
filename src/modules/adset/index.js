import axios from "axios";
import { queryResolver } from "../../utils/query";

const xhr = axios.create({
  baseURL: process.env.MOCK_URL
});

export const resolvers = {
  Query: {
    adset: queryResolver("adset")
  },
  Mutation: {
    mock: () => null
  }
};
