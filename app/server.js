'use strict';

let moment = require('moment');

let path = require('path');
let express = require('express');
let expressVue = require('express-vue');
let app = express();
let methodOverride = require('method-override');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let cors = require('cors');
let error = require('./../libs/error');

let exampleMixin = {
    methods: {
        hello: function () {
            console.log('Hello');
        }
    }
}

app.engine('vue', expressVue);
app.set('view engine', 'vue');
app.set('views', path.join(__dirname, '/views'));
app.set('vue', {
    componentsDir: path.join(__dirname, '/views/components'),
    defaultLayout: 'layout'
});

morgan.token('pid', function (request, response) { return process.pid; });
app.use(morgan(function (tokens, request, response) {
    let log = tokens['method'](request, response) + ' ';
    log += tokens['status'](request, response) + ' ';
    log += tokens['response-time'](request, response) + ' ms - PID: ' + tokens['pid'](request, response);
    return log;
}));

app.use(methodOverride());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors());

app.get('/', (req, res, next) => {
    let scope = {
        data: {
            title: pageTitle,
            message: 'Hello!',
            users: users
        },
        vue: {
            head: {
                title: pageTitle,
                meta: [
                    { property:'og:title', content: pageTitle},
                    { name:'twitter:title', content: pageTitle}
                ],
                structuredData: {
                    "@context": "http://schema.org",
                    "@type": "Organization",
                    "url": "http://www.your-company-site.com",
                    "contactPoint": [{
                        "@type": "ContactPoint",
                        "telephone": "+1-401-555-1212",
                        "contactType": "customer service"
                    }]
                }
            },
            components: ['users', 'message'],
            mixins: [exampleMixin]
        }
    };
    res.render('index', scope);
});

app.use((req, res, next) => {
    next(error.NotFound());
});

app.use((err, req, res, next) => {
    res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message
    });
});

var users = [];
var pageTitle = 'Express Vue';
users.push({ name: 'tobi', age: 12 });
users.push({ name: 'loki', age: 14  });
users.push({ name: 'jane', age: 16  });

let server = app.listen(3000, function() {
    let host = server.address().address;
    let port = server.address().port;
    console.log("Server listening at http://%s:%s", host, port);
});