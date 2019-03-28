import { nestedQueryResolver } from "../../utils/query";

export const resolvers = {
  Query: {
    mediaplan: nestedQueryResolver("mediaplan")
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
