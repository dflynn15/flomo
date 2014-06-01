'use strict';

var services = require('../controllers/services');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin && req.article.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

// The Package is past automatically as first parameter
module.exports = function(Services, app, auth, database) {

    app.get('/services/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

	// Routes for the service landing
	app.route('/services')
        .get(services.all)
        .post(auth.requiresLogin, services.create);


	// Routes for sepcific services
    app.route('/services/:serviceId')
		.get(services.show)
		.put(auth.requiresLogin, hasAuthorization, services.update)
		.delete(auth.requiresLogin, hasAuthorization, services.destroy);

	// Finish with setting up the serviceId param
    app.param('serviceId', services.services);
};
