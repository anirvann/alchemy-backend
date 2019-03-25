import QueryStream from "pg-query-stream";
import JSONStream from "JSONStream";

import serverReqTimer from "./serverReqTimer";
import visitors from "../queries/visitors";
import visitorDetails from "../queries/visitorDetails";
import averageBets from "../queries/averageBet";
import twins from "../queries/twins";
import fnbSpent from "../queries/fnbSpent";

const streamResponse = (stream, response, done, startTime) =>
  stream
    .pipe(JSONStream.stringify())
    .pipe(response)
    .on("end", serverReqTimer(response, startTime, done, 'Ended'))
    .on("close", serverReqTimer(response, startTime, done, 'Closed'))
    .on("finish", serverReqTimer(response, startTime, done, 'Finished'));

export const totalVisitors = pool => async (request, response) => {
  const startTime = process.hrtime();
  pool.connect((err, client, done) => {
    if (err) throw err;
    const query = new QueryStream(visitors);
    const stream = client.query(query);
    streamResponse(stream, response, done, startTime);
  });
};

export const totalVisitorsDetail = pool => async (request, response) => {
  const startTime = process.hrtime();
  pool.connect((err, client, done) => {
    if (err) throw err;
    const query = new QueryStream(visitorDetails);
    const stream = client.query(query);
    streamResponse(stream, response, done, startTime);
  });
};

export const totalGamers = pool => async (request, response) => {
  const startTime = process.hrtime();
  pool.connect((err, client, done) => {
    if (err) throw err;
    const query = new QueryStream(visitors);
    const stream = client.query(query);
    streamResponse(stream, response, done, startTime);
  });
};

export const totalAverageBets = pool => async (request, response) => {
  const startTime = process.hrtime();
  pool.connect((err, client, done) => {
    if (err) throw err;
    const query = new QueryStream(averageBets);
    const stream = client.query(query);
    streamResponse(stream, response, done, startTime);
  });
};

export const totalTwins = pool => async (request, response) => {
  const startTime = process.hrtime();
  pool.connect((err, client, done) => {
    if (err) throw err;
    const query = new QueryStream(twins);
    const stream = client.query(query);
    streamResponse(stream, response, done, startTime);
  });
};

export const totalfnbSpent = pool => async (request, response) => {
  const startTime = process.hrtime();
  pool.connect((err, client, done) => {
    if (err) throw err;
    const query = new QueryStream(fnbSpent);
    const stream = client.query(query);
    streamResponse(stream, response, done, startTime);
  });
};
