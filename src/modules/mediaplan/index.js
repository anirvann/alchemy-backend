import axios from "axios";
import { nestedQueryResolver } from "../../utils/query";

const xhr = axios.create({
  baseURL: process.env.MOCK_URL
});

export const resolvers = {
  Query: {
    mediaplan: async (_, _args) =>
      await xhr
        .get("mediaplan")
        .then(mediaplans =>
          _args.id && _args.id.length
            ? mediaplans.data.filter(datum => _args.id.includes(datum.id))
            : mediaplans.data
        )
  },
  MediaPlan: {
    campaigns: nestedQueryResolver("campaign", "campaignIds")
  },
  Campaign: {
    adsets: nestedQueryResolver("adset", "adsetIds")
  },
  AdSet: {
    ads: nestedQueryResolver("ad", "adIds")
  },
  Mutation: {
    mock: () => null
  }
};
