"use strict";
require.config({
	baseUrl:'src/',
	map:{
	},
	shim:{
		bootstrap:{
			deps:['jquery']
		}
	},
	paths:{
		'jquery': 'vendor/jquery-1.11.3.min',
		'bootstrap': 'vendor/bootstrap-3.3.5-dist/js/bootstrap.min',
        'Todo': 'js/modules/Todo',
		'modules':'js/modules',
		'models':'js/models'
	}
});
require(
[
	'jquery',
    'Todo',
	'bootstrap'
],
function(
	$,
    Todo
){
    console.log('config');
	$(function(){
		console.log('dom ready');
		Todo.init();

        window.Todo = Todo;
	})
	
}
);