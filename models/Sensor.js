var db = require ('../data/database');

exports.create = function(id, sensor_id, time, type_code, data_type, value) {
    var q = 'insert into data_points (id, sensor_id')

    db.query(q, [sensor_id, time, type_code, data_type, value]) {
        if (err) callback(err);
        else callback(err, result);
    }
}