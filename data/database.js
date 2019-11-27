require('dotenv').config()
// const db = require('./datastore');
//const pg = require('pg')
// const pgp = require('pg-promise')
// const db = createDataStore();


const dbConfig = require('./db-config') 
const pgp = require('pg-promise')()

const db = pgp(dbConfig)


const { DataSource } = require('apollo-datasource');

class DataPointAPI extends DataSource {
  constructor( {store}) {
    super( {store} );
    this.store = store;
  }

  async getDataPoint(id) {
    return db.oneOrNone('SELECT * FROM data_points WHERE id = $(id)', {
      id: id
    })
  }

  async getDataPoints() {
    return db.many('SELECT * FROM data_points');
  }

  async getDataPointsByType(data) {
    var string = 'SELECT * FROM data_points WHERE data_type = $(data_type) AND sensor_id IN ('
    string += data.ids.join(', ') + ')'
    return db.many(string, {
      data_type: data.data_type,
    });
  }

  async getTemperatureDataPoints() {
    return db.many('SELECT * FROM data_points WHERE data_type = \'temperature\'');
  }

  // AND sensor_id IN $(ids)'

  async postDataPoint(dataPoint) {
      return this.post(
          'data_points',
          dataPoint,
      )
  }
}

class SensorAPI extends DataSource {
    constructor( {store}) {
        super( {store} );
        this.store = store;
    }
  
    async getSensor(id) {
      return db.oneOrNone('SELECT * FROM sensors WHERE id = $(id)', {
        id: id
      });
      }
  
    async getSensors() {
      return db.many('SELECT * FROM sensors');
    }

    async postSensor(sensor) {
        debugger
        // extend(obj, dc) {
        //     obj.addPost = sensor => {
        //         return obj.one('INSERT INTO sensors(sensor) VALUES($1) RETURNING id', sensor, a => a.id)
        //     }
        // }
        // return this.post(
        //     'sensors',
        //     {id, location},

        //     //deconstruct sensor into component pieces, id and location
        //     //pg-promise receive method, potentially?
        // )
    }
}
  
module.exports = { DataPointAPI, SensorAPI };