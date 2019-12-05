require('dotenv').config();
// const db = require('./datastore');
//const pg = require('pg')
// const pgp = require('pg-promise')
// const db = createDataStore();

const DataLoader = require('dataloader');

const dbConfig = require('./db-config');
const pgp = require('pg-promise')();

const db = pgp(dbConfig);


const { DataSource } = require('apollo-datasource');

class DataPointAPI extends DataSource {
  constructor( {store}) {
    super( {store} );
    this.store = store;

    this.sensorDataPointLoader = new DataLoader(ids => this.batchSensorDataPoints(ids));
    this.queryLoader = new DataLoader(queries => this.batchQuery(queries), {cache: false});
  }

  async batchSensorDataPoints(ids) {
    const params = ids.map(id => '?').join();
    const query = 'SELECT * FROM data_points WHERE sensor_id IN(${params})';
    const result = await this.queryLoader.load(query);
    const returnRows = await ids.map(id => result.rows.find(row => row.id === id) || new Error(`Row not found: ${id}`))
  }

  async batchQuery(queries) {
    const joinedQueries = queries.join();

    const result = await this.store.multiResult(joinedQueries)
    
  }

  async getDataPoint(id) {
    return db.oneOrNone('SELECT * FROM data_points WHERE id = $(id)', {
      id: id
    });
  }

  async getDataPoints() {
    return db.many('SELECT * FROM data_points');
  }

  async getDataPointsFromSensor(id) {
    var output = db.many('SELECT * FROM data_points WHERE sensor_id = $(id)', {
      id: id
    });
    console.log(`loaded sensor ${id}`);
    return output;

    // return db.many('SELECT * FROM data_points WHERE sensor_id = $(id)', {
    //   id: id
    // });
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
      );
  }
}

class SensorAPI extends DataSource {
    constructor( {store}) {
        super( {store} );
        this.store = store;
    }
  
    async getSensor(id) {
      return db.oneOrNone('SELECT * FROM sensors WHERE id = $(id) INNER JOIN data_points ON sensors.id = data_points.sensor_id', {
        id: id
      });
      }
  
    async getSensors() {
      var output = db.many('SELECT * FROM sensors');
      console.log(output[0]);
      return output;
      // return db.many('SELECT * FROM sensors');
    }

    // async postSensor(sensor) {
    //     debugger
    //     // extend(obj, dc) {
    //     //     obj.addPost = sensor => {
    //     //         return obj.one('INSERT INTO sensors(sensor) VALUES($1) RETURNING id', sensor, a => a.id)
    //     //     }
    //     // }
    //     // return this.post(
    //     //     'sensors',
    //     //     {id, location},

    //     //     //deconstruct sensor into component pieces, id and location
    //     //     //pg-promise receive method, potentially?
    //     // )
    // }
}
  
module.exports = { DataPointAPI, SensorAPI };