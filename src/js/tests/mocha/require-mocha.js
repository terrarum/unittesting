"use strict";
require.config({
	baseUrl:'lib',
    paths: {
        //configuration for testing
		'units':'../units',
		'js': '../../../',
		'modules':'../../../modules',
		'models':'../../../models',
		
		//vendors
		'jquery': '../../../../vendor/jquery-1.11.3.min',
		'chai': 'chai',
        'mocha': 'mocha'
    },
	
    shim: {
		bootstrap:{
			deps:['jquery']
		},
        chai: {
            deps: ['mocha']
        }
    }
});

require(
    [
		'units/Todo',
        'chai'
	],
    function(
		Todo,
        Chai
	) {
        mocha.setup('bdd');
        var should = Chai.should();
		Todo.run();
        mocha.run();


    }
);
