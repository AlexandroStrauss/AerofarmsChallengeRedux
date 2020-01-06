const { SensorAPI, DataPointAPI } = require('./datasource')
const { DataSource } = require('apollo-datasource')
const dbConfig = require('./db-config')
const path = require('path')

const pgp = require('pg-promise')()

const db = pgp(dbConfig)

const fs = require('fs') // this is necessary for reading files and I keep forgetting that it is

// pgp.helpers.insert(data_points, ['id', 'sensor_id', 'date', 'data_type', 'value', 'type_code'], 'data_points')

async function deleteDataPoints () {
  const result = await db.none('DROP TABLE data_points')
    .then(() => {
      // success;
    }).catch(error => {
      // error
    })
  return result
}

async function createDataPoints () {
  const result = await db.none('CREATE TABLE IF NOT EXISTS data_points (id integer NOT NULL PRIMARY KEY, sensor_id integer NOT NULL, date VARCHAR(50), data_type VARCHAR(50), value decimal NOT NULL, type_code integer);')
    .then(() => {
      // success;
    }).catch(error => {
      console.log(error)
    })
  return result
}

async function seedDataPoints () {
  const dataPoints = await JSON.parse(fs.readFileSync(path.resolve(__dirname, 'sensor_data.json'), 'utf8'))

  const result = await dataPoints.forEach(point => {
    db.none('INSERT INTO data_points(id, sensor_id, date, data_type, value, type_code) VALUES($(point.id), $(point.sensor_id), $(point.time), $(point.data_type), $(point.value), $(point.type_code))', {
      point: point
    }).then(() => {
      // success;
    }).catch(error => {
      // error;
    })
  })
  return result
}

// deleteDataPoints().then(
createDataPoints().then(seedDataPoints())
// );

async function createSensors () {
  const result = await db.none('CREATE TABLE IF NOT EXISTS sensors (id integer NOT NULL PRIMARY KEY, location VARCHAR(20));')
    .then(() => {
      // success;
    }).catch(error => {
      console.log(error)
    })
  return result
}
async function seedSensors () {
  const sensors = await JSON.parse(fs.readFileSync(path.resolve(__dirname, 'sensor_list.json'), 'utf8'))

  // db.none('CREATE TABLE IF NOT EXISTS sensors (id integer NOT NULL PRIMARY KEY, location VARCHAR(20));')
  // .then(
  sensors.forEach(sensor => {
    db.none('INSERT INTO sensors(id, location) VALUES($(sensor.id), $(sensor.location))', {
      sensor: sensor
    }).then(() => {
      // success;
    }).catch(error => {
      console.log(error)
      // error;
    })
  })
  // );
}
// )
// )
// db.none('DROP TABLE sensors').then(db.none('DROP TABLE data_points').then(() => {
//     seedDataPoints().then(
//         seedSensors()
//     );
//     }).catch(error => {
//         console.log(error);
//     })
// )

// pgp.helpers.insert(sensors, ['id', 'location'], 'sensors')

// CREATE TABLE data_points (
//  id integer NOT NULL PRIMARY KEY,
//  sensor_id integer NOT NULL REFERENCES sensors(id),
//  date VARCHAR(50),
//  data_type VARCHAR(50),
//  value decimal NOT NULL,
//  type_code integer
//      );

//   CREATE TABLE sensors(
//      id INTEGER NOT NULL PRIMARY KEY,
//      location VARCHAR(20)
//  );
