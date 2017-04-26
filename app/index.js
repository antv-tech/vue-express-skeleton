'use strict';

let env = process.env.NODE_ENV || 'development';

let os = require('os');
let cluster = require('cluster');
cluster.schedulingPolicy = cluster.SCHED_RR;

if (env === 'production' && cluster.isMaster) {
    for (let i = 0; i < os.cpus().length; i++)
        cluster.fork();

    cluster.on('exit', function(worker) {
        console.log('Worker ' + worker.process.pid + ' died, respawning...');
        cluster.fork();
    });
} else {
    require('./server.js');
}