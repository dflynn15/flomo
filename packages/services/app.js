'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Services = new Module('services');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Services.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Services.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Services.menus.add({
        title: 'Services',
        link: 'all services',
        roles: ['authenticated'],
        menu: 'main'
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Services.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Services.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Services.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Services;
});
