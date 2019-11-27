const { ApolloServer, gql } = require('apollo-server-express');
let fs = require('fs');
const pg = require('pg');
const {DataPointAPI, SensorAPI} = require('../data/database');


const typeDefs = gql`
type DataPoint {
    id: ID
    sensor_id: ID
    date: String
    data_type: String
    value: Float
    type_code: Int
    sensor: Sensor
}

type Sensor {
    id: ID
    location: String
    dataPoints: [DataPoint]
}

type Query {
    sensor: Sensor
    dataPoint: DataPoint
    sensors: [Sensor]
    dataPoints: [DataPoint]
    dataPointsByType(data_type: String!, ids: [ID]!): [DataPoint]
    temperatureDataPoints: [DataPoint]
}
`;

const resolvers = {
    Query: {
        sensor: async(_source, { id }, {dataSources}) => {
            return dataSources.SensorAPI.getSensor(id);
        },
        sensors: async(_source, _, {dataSources}) => {
            return dataSources.SensorAPI.getSensors();
        },
        dataPoint: async(_source, { id }, { dataSources }) => {
            return dataSources.DataPointAPI.getDataPoint(id);
        },
        dataPoints: async(_source, _,{ dataSources }) => {
            return dataSources.DataPointAPI.getDataPoints();
        },
        dataPointsByType: async(_source, { data_type, ids }, { dataSources }) => {
            return dataSources.DataPointAPI.getDataPointsByType({data_type: data_type, ids: ids});
        },
        temperatureDataPoints: async(_source, _, { dataSources }) => {
            return dataSources.DataPointAPI.getTemperatureDataPoints();
        }
    },
};

export {typeDefs, resolvers};