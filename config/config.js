var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        root: rootPath,
        app: {
            name: 'stlsoundnet'
        },
        port: 8080,
        db: {
            database: "bfza6duiaat2a7w",
            user: "uaa7fnnv7lfjamagctoy",
            password: "R2HPg65Cga64hgTs8xp3",
            options: {
                host: "bfza6duiaat2a7w-postgresql.services.clever-cloud.com",
                port: "5432",
                dialect: 'postgres',

                pool: {
                    max: 100,
                    min: 0,
                    idle: 10000
                }
            }
        }
    }
}

module.exports = config[env];