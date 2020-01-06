import DataLoader from 'dataloader';

const { ApolloServer, gql } = require('apollo-server-express');
let fs = require('fs');
const pg = require('pg');
const {DataPointAPI, SensorAPI} = require('../data/datasource');


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
    dataPoints: [DataPoint]!
    dataPointsByType(data_type: String!, ids: [ID]): [DataPoint]
    temperatureDataPoints: [DataPoint]
    dataPointsFromSensor(id: ID!): [DataPoint]
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
        },
        dataPointsFromSensor: async(_source, {id}, { dataSources }) => {
            return dataSources.DataPointAPI.getDataPointsFromSensor(id);
        }
    },
    Sensor: {
        id: sensor => sensor.id,
        location: sensor => sensor.location,

        dataPoints: async (_source, _, {dataSources}) => {
            const response = await dataSources.DataPointAPI.sensorDataPointLoader.load(_source.id)
            return response;
        },
        __resolveReference(sensor) {
            return getSensor(sensor.id);
        }
    },
    DataPoint: {
        id: dataPoint => dataPoint.id,
        value: dataPoint => dataPoint.value,
        type_code: dataPoint => dataPoint.type_code,
        data_type: dataPoint => dataPoint.data_type,
        date: dataPoint => dataPoint.date,
        sensor_id: dataPoint => dataPoint.sensor_id,

        sensor: async(_source, _, {dataSources}) => {
            const response = await dataSources.SensorAPI.getSensor(_source.sensor_id);
            return response;
        },
        __resolveReference(dataPoint) {
            return getDataPoint(dataPoint.id);
        }
        
    }
};

export {typeDefs, resolvers};