import { GraphQLServer } from "graphql-yoga";
import fs from "fs";
import path from "path";
import { mergeSchemas, makeExecutableSchema } from "graphql-tools";
import { importSchema } from "graphql-import";
import compression from "compression";
import axios from "axios";
import redisCache from "express-redis-cache";
// import CombinedStream from "combined-stream";
import { Pool } from "pg";

// import { getAds } from "./query";
// import serverReqTimer from "./serverReqTimer";
import {
  totalVisitors,
  totalVisitorsDetail,
  totalGamers,
  totalAverageBets,
  totalTwins,
  totalfnbSpent
} from "./queriesConnection";
import { response } from "express";
// import Redis from "ioredis";
const pool = new Pool({
  database: "postgres",
  user: "shashank_kumar",
  database: "genting",
  password: "4*s0<T.5k7u&2koyCD~>0PrthD%cO`b{",
  port: "5439",
  host: "genting.cnpzuz3xslqd.us-west-2.redshift.amazonaws.com",
  ssl: true
});

const xhr = axios.create({
  baseURL: process.env.MOCK_URL
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});
const schemasGenerator = () => {
  const folders = fs.readdirSync(path.join(__dirname, "../modules"));
  const executableSchemas = [];

  folders.forEach(folder => {
    const { resolvers } = require(`../modules/${folder}`);
    const typeDefs = importSchema(
      path.join(__dirname, `../modules/${folder}/schema.graphql`)
    );
    executableSchemas.push(makeExecutableSchema({ resolvers, typeDefs }));
  });
  return executableSchemas;
};

const mockedEndpoint = resource => async (req, res) => {
  await xhr
      .get(resource)
      .then(result => res.send(result.data), err => console.error(err));
}
export const startServer = async () => {
  const server = new GraphQLServer({
    schema: mergeSchemas({ schemas: schemasGenerator() }),
    context: {},
    dataSources: () => {},
    middlewares: []
  });

  // server.express.get("/ads", getAds);

  server.express.use(compression());
  server.express.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  if(process.env.NODE_CACHED){
    console.log('inside node cached block');
    const cache = redisCache();

    if(process.env.NODE_MOCKED){
    console.log('inside node mocked block');
      server.express.get("/totalVisitors", cache.route(), mockedEndpoint("visitors"));
      server.express.get("/visitorDetails", cache.route(), mockedEndpoint("visitorDetails"));
      server.express.get("/totalGamers", cache.route(), mockedEndpoint("gamers"));
      server.express.get("/totalAverageBets", cache.route(), mockedEndpoint("averageBets"));
      server.express.get("/totalTwins", cache.route(), mockedEndpoint("twins"));
      server.express.get("/totalfnbSpent", cache.route(), mockedEndpoint("fnb"));
    }
    server.express.get("/totalVisitors", cache.route(), totalVisitors(pool));
    server.express.get("/visitorDetails", cache.route(), totalVisitorsDetail(pool));
    server.express.get("/totalGamers", cache.route(), totalGamers(pool));
    server.express.get("/totalAverageBets", cache.route(), totalAverageBets(pool));
    server.express.get("/totalTwins", cache.route(), totalTwins(pool));
    server.express.get("/totalfnbSpent", cache.route(), totalfnbSpent(pool));
  }else{
    console.log(process.env.NODE_CACHED);
    console.log(process.env.NODE_MOCKED);
    console.log('no mocked cached block');

    server.express.get("/totalVisitors", totalVisitors(pool));
    server.express.get("/visitorDetails", totalVisitorsDetail(pool));
    server.express.get("/totalGamers", totalGamers(pool));
    server.express.get("/totalAverageBets", totalAverageBets(pool));
    server.express.get("/totalTwins", totalTwins(pool));
    server.express.get("/totalfnbSpent", totalfnbSpent(pool));
  }

  const app = await server.start({
    port: process.env.PORT
  });
  console.log(() => `Server is started on localhost: ${process.env.PORT}`);
  return app;
};
