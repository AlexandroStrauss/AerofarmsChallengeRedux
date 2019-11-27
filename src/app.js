
const { ApolloServer, gql } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');
const express = require('express');
const app = express();
const {DataPointAPI, SensorAPI} = require('../data/database')

const { createDataStore } = require('../data/datastore');
// this instantiates the data store (which contains pg-promise functions)
const store = createDataStore();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      DataPointAPI: new DataPointAPI({store}),
      SensorAPI: new SensorAPI({store}),
    };
  }
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
