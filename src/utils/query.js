import axios from "axios";

const cache = {};

const xhr = axios.create({
  baseURL: process.env.MOCK_URL
});
// const client = redis.createClient();
// const pool = new pg.Pool({
//   user: "me",
//   host: "localhost",
//   database: "dev-alchemy",
//   password: "password",
//   port: 5432
// });

export const nestedQueryResolver = (endPoint, idKey) => (
  parent,
  _args
) => {
  if(cache[endPoint]){
    if (_args.id && _args.id.length) {
      return cache[endPoint].data.filter(
        datum =>
          _args.id.includes(datum.id) && parent[idKey].includes(datum.id)
      );
    } else if (parent[idKey] && parent[idKey].length) {
      return cache[endPoint].data.filter(datum => parent[idKey].includes(datum.id));
    } else {
      return cache[endPoint].data;
    }
  }else {
    return xhr.get(endPoint).then(
      response => {
        cache[endPoint] = response;
        if (_args.id && _args.id.length) {
          return response.data.filter(
            datum =>
              _args.id.includes(datum.id) && parent[idKey].includes(datum.id)
          );
        } else if (parent[idKey] && parent[idKey].length) {
          return response.data.filter(datum => parent[idKey].includes(datum.id));
        } else {
          return response.data;
        }
      },
      err => console.error(err)
    );
  }
};

export const queryResolver = endPoint => async (_, _args) =>
  await xhr
    .get(endPoint)
    .then(
      response =>
        _args.id && _args.id.length
          ? response.data.filter(datum => _args.id.includes(datum.id))
          : response.data,
      err => console.error(err)
    );

// export const getAds = async (request, response) =>
//   await pool.query("SELECT * FROM ads ORDER BY id ASC", (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).json(results.rows);
//   });
