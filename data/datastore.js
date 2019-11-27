module.exports.createDataStore = () => {
    // Loading and initializing the library:
    const pgp = require('pg-promise')({
        // Initialization Options
        schema: process.env.POSTGRESQL_SCHEMA,
    });
    const host = process.env.POSTGRESQL_HOST;
    const port = process.env.POSTGRESQL_PORT;
    const database = process.env.POSTGRESQL_DATABASE;
    const ssl = process.env.POSTGRESQL_SSL;
    const user = process.env.POSTGRESQL_USER;
    const password = process.env.POSTGRESQL_PASSWORD;

    // Preparing the connection details:
    const cn = `postgres://${user}:${password}@${host}:${port}/${database}?ssl=${ssl}`;

    // Creating a new database instance from the connection details:
    const db = pgp(cn);

    // Exporting the database object for shared use:
    //module.exports = db;
    return db;
};