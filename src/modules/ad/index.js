// import axios from "axios";

import { queryResolver } from "../../utils/query";

// const xhr = axios.create({
//   baseURL: "http://localhost:4000/"
// });

export const resolvers = {
  Query: {
    ad: queryResolver("ad")
    // ad: async (_, _args) =>
    //   await xhr
    //     .get("/ads")
    //     .then(
    //       response =>
    //         _args.id && _args.id.length
    //           ? response.data.filter(datum => _args.id.includes(datum.id))
    //           : response.data,
    //       err => console.error(err)
    // )
  },
  Mutation: {
    mock: () => null
  }
};
