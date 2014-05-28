'use strict';

// The Package is past automatically as first parameter
module.exports = function(Services, app, auth, database) {

    app.get('/services/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/services/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/services/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/services/example/render', function(req, res, next) {
        Services.render('index', {
            package: 'services'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};
