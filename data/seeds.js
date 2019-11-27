const {SensorAPI, DataPointAPI} = require('./database')
const { DataSource } = require('apollo-datasource');
const dbConfig = require('./db-config') 
const pgp = require('pg-promise')()

const db = pgp(dbConfig)

// const pg = require('pg');
const fs = require('fs'); // this is necessary for reading files and I keep forgetting that it is

let dataPoints = JSON.parse(fs.readFileSync('../data/sensor_data.json', 'utf8'));
db.none('DELETE FROM data_points').then(
    dataPoints.forEach(point => {
        db.none('INSERT INTO data_points(id, sensor_id, date, data_type, value, type_code) VALUES($(point.id), $(point.sensor_id), $(point.time), $(point.data_type), $(point.value), $(point.type_code))', {
            point: point,
        }).then(() => {
            //success;
        }).catch(error => {
            //error;
        });
    })
)

let sensors = JSON.parse(fs.readFileSync('../data/sensor_list.json', 'utf8'));
db.none('DELETE FROM sensors').then(
        sensors.forEach(sensor => {
        db.none('INSERT INTO sensors(id, location) VALUES($(sensor.id), $(sensor.location))', {
            sensor: sensor,
        }).then(() => {
            //success;
        }).catch(error => {
            console.log(error);
            //error;
        })
    })
)


// CREATE TABLE data_points (
//          id integer NOT NULL PRIMARY KEY,
//          sensor_id integer NOT NULL REFERENCES sensors(id),
//          date VARCHAR(50),
//          data_type VARCHAR(50),
//          value decimal NOT NULL,
//          type_code integer
//      );


//       CREATE TABLE sensors(
//          id INTEGER NOT NULL PRIMARY KEY,
//          location VARCHAR(20)
//      );