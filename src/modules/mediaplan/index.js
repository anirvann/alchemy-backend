import axios from "axios";
import { nestedQueryResolver } from "../../utils/query";

const cache = {};

const xhr = axios.create({
  baseURL: process.env.MOCK_URL
});

export const resolvers = {
  Query: {
    mediaplan: (_, _args) => {
      if(cache["mediaplan"]){
        return _args.id && _args.id.length
          ? cache["mediaplan"].data.filter(datum => _args.id.includes(datum.id))
          : cache["mediaplan"].data;
      }else {
        return xhr
          .get("mediaplan")
          .then(response => {
            cache["mediaplan"] = response;
            return _args.id && _args.id.length
              ? response.data.filter(datum => _args.id.includes(datum.id))
              : response.data
          })
      }
    }
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
