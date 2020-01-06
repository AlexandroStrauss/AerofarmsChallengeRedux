const pgp = require('pg-promise')()

const DataLoader = require('dataloader')

const dbConfig = require('./db-config')

const db = pgp(dbConfig)

const { DataSource } = require('apollo-datasource')

class DataPointAPI extends DataSource {
  constructor ({ store }) {
    super({ store })
    this.store = store

    this.sensorDataPointLoader = new DataLoader(ids => this.batchSensorDataPoints(ids))
    // this.queryLoader = new DataLoader(queries => this.batchQuery(queries), {cache: false});
  }

  async batchSensorDataPoints (ids) {
    const params = ids.map(id => `${id}`).join()
    const result = await db.many(`SELECT * FROM data_points WHERE sensor_id IN(${params}) ORDER BY id`)

    // this separates the datapoints into subarrays of the larger response array, sorted by their sensor_id
    const response = await ids.map(id => result.filter(row => row.sensor_id === id) || new Error(`Row not found: ${id}`))

    return response
  }

  async getDataPoint (id) {
    return db.oneOrNone('SELECT * FROM data_points WHERE id = $(id)', {
      id: id
    })
  }

  async getDataPoints () {
    return db.many('SELECT * FROM data_points')
  }

  async getDataPointsFromSensor (id) {
    var output = db.many('SELECT * FROM data_points WHERE sensor_id = $(id) ORDER BY id', {
      id: id
    })
    return output
  }

  async getDataPointsByType (data) {
    try {
      var string = 'SELECT * FROM data_points WHERE data_type = $(data_type) AND sensor_id IN ('
      string += data.ids.join(', ') + ') ORDER BY id'
      return db.many(string, {
        data_type: data.data_type
      })
    } catch (e) {
      return new Error('error description here')
    }
  }

  async getTemperatureDataPoints () {
    return db.many('SELECT * FROM data_points WHERE data_type = \'temperature\'')
  }

  // AND sensor_id IN $(ids)'

  async postDataPoint (dataPoint) {
    return this.post(
      'data_points',
      dataPoint
    )
  }
}

class SensorAPI extends DataSource {
  constructor ({ store }) {
    super({ store })
    this.store = store
  }

  async getSensor (id) {
    return db.oneOrNone('SELECT * FROM sensors WHERE id = $(id)', {
      id: id
    })
  }

  async getSensors () {
    var output = db.many('SELECT * FROM sensors')
    return output
  }
}

module.exports = { DataPointAPI, SensorAPI }
