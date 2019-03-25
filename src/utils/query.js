import axios from "axios";
// import pg from "pg";

const xhr = axios.create({
  baseURL: process.env.MOCK_URL
});

// const pool = new pg.Pool({
//   user: "me",
//   host: "localhost",
//   database: "dev-alchemy",
//   password: "password",
//   port: 5432
// });

export const nestedQueryResolver = (endPoint, idKey) => async (
  parent,
  _args
) => {
  return await xhr.get(endPoint).then(
    response => {
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
