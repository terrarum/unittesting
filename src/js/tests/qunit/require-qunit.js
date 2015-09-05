"use strict";
require.config({
	baseUrl:'lib',
    paths: {
        //configuration for testing
		'QUnit': 'qunit',
		'units':'../units',
		'js': '../../../',
		'modules':'../../../modules',
		'models':'../../../models',
		
		//vendors
		'jquery': '../../../../vendor/jquery-1.11.3.min'
    },
	
    shim: {
		bootstrap:{
			deps:['jquery']
		},
       'QUnit': {
           exports: 'QUnit',
           init: function() {
               QUnit.config.autoload = false;
               QUnit.config.autostart = false;
           }
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
		'QUnit'
	],
    function(
		Todo,
		QUnit
	) {
		
        QUnit.load();
		QUnit.start();
		Todo.run();
    }
);
