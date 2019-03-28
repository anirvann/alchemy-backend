import axios from "axios";
import ioredis from "ioredis";

const client = new ioredis();
const xhr = axios.create({
  baseURL: process.env.MOCK_URL
});

export const xhrWrapper = endpoint => {
  return client
    .get(endpoint)
    .then(response => {
      if(response){
        return { data: JSON.parse(response) };
      }else {
        return xhr.get(endpoint).then(response => {
          console.log(response.data);
          client.set(endpoint, JSON.stringify(response.data));
          return response;
        });
      }
    })
    .catch(err => console.error(`REST API call failed :: ${err}`))
}

export const nestedQueryResolver = (endPoint, idKey) => (parent, _args) => {
  return xhrWrapper(endPoint).then(
    response => {
      if (_args.id && _args.id.length && idKey) {
        return response.data.filter(
          datum =>
            _args.id.includes(datum.id) && parent[idKey].includes(datum.id)
        );
      } else if (parent && parent[idKey] && parent[idKey].length) {
        return response.data.filter(datum => parent[idKey].includes(datum.id));
      } else {
        return response.data;
      }
    },
    err => console.error(err)
  )
  .catch(err => console.error(err));
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