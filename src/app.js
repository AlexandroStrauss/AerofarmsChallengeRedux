require('dotenv').config();

const { ApolloServer, gql } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');
const express = require('express');
const app = express();
const {DataPointAPI, SensorAPI} = require('../data/datasource');


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
  },
  formatError: error => {
    console.log("===================== Error: =====================");
    console.log(error);
    return error;
},
formatResponse: response => {
    // console.log("===================== Response: ==================");
    // console.log(response);
    return response;
},

});


server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
