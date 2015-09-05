"use strict";
require.config({
	baseUrl:'lib',
    paths: {
        //configuration for testing
		'units': '../units',
		'js': '../../../',
		'modules': '../../../modules',
		'models': '../../../models',

        'jasmine': 'jasmine-2.3.4/jasmine',
        'jasmine-html': 'jasmine-2.3.4/jasmine-html',
        'jasmine-boot': 'jasmine-2.3.4/boot',

		//vendors
		'jquery': '../../../../vendor/jquery-1.11.3.min'
    },
	
    shim: {
		bootstrap:{
			deps: ['jquery']
		},
        'jasmine-html': {
            deps : ['jasmine']
        },
        'jasmine-boot': {
            deps : ['jasmine', 'jasmine-html']
        }
    }
});

/**
* Place unit tests in here. 
* Unit tests should expose a "run" method.
* Running tests should be as simple as calling TestName.run() inside requirejs
* See: units/Testerson.js
*/
require(
    [
        'units/Todo',
        'jasmine-boot'
	],
    function(
        Todo,
        Jasmine
	) {
        Todo.run();
        window.onload(); // Trigger Jasmine.
    }
);
