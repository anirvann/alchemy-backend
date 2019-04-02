import { GraphQLServer } from "graphql-yoga";
import fs from "fs";
import path from "path";
import { mergeSchemas, makeExecutableSchema } from "graphql-tools";
import { importSchema } from "graphql-import";
import compression from "compression";
import { Pool } from "pg";

import {
  totalVisitors,
  totalVisitorsDetail,
  totalGamers,
  totalAverageBets,
  totalTwins,
  totalfnbSpent
} from "./queriesConnection";

const pool = new Pool({
  database: "postgres",
  user: "shashank_kumar",
  database: "genting",
  password: "4*s0<T.5k7u&2koyCD~>0PrthD%cO`b{",
  port: "5439",
  host: "genting.cnpzuz3xslqd.us-west-2.redshift.amazonaws.com",
  ssl: true
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

export const startServer = async () => {
  const server = new GraphQLServer({
    schema: mergeSchemas({ schemas: schemasGenerator() }),
    context: {},
    dataSources: () => {},
    middlewares: []
  });

  server.express.use(compression());
  server.express.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  server.express.get("/totalVisitors", totalVisitors(pool));
  server.express.get("/visitorDetails", totalVisitorsDetail(pool));
  server.express.get("/totalGamers", totalGamers(pool));
  server.express.get("/totalAverageBets", totalAverageBets(pool));
  server.express.get("/totalTwins", totalTwins(pool));
  server.express.get("/totalfnbSpent", totalfnbSpent(pool));

  const app = await server.start({
    port: process.env.PORT
  });
  console.log(() => `Server is started on localhost: ${process.env.PORT}`);
  return app;
};
