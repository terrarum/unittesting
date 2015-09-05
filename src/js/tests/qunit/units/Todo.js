"use strict";
define(function(require) {

    var Todo = require('modules/Todo');

	/*
	- createItem(string)
	- deleteItem(id)
	- updateItem(id,string)
	- getAllItems()
	*/
	
	var run = function(){
		
		module('Todo Module',{
			beforeEach:function(){
				Todo.init();
			}
		});

		test('The initial return of an empty Todo list should be an empty array', function() {
            var items = Todo.getAllItems();
			deepEqual(items, [], 'Expecting an empty array when there is nothing to do...');
		});

		test('Insert a new item into the todo list, make sure the array is getting incremented', function(){

            Todo.createItem("Wash the Car");
            var items = Todo.getAllItems();
            var todoString = items[0].task;

            deepEqual(items.length, 1, 'Expecting items length to be one now that we have created one task.');
            equal(todoString, "Wash the Car", "Expecting the inserted task's string to match Wash the Car.")
		});

		test('Getting all items from Todo Module should return a list of items "to do"', function(){
            Todo.createItem("Walk the Dog");
            Todo.createItem("Buy Milk");
            var items = Todo.getAllItems();

            equal(items.length, 2, "Two items added to To Do list.");
            equal(items[0].task, "Walk the Dog", "First item in array is first item added.");
		});
		
		test('Update item by id in the todo list to read "Fly the Plane"', function(){
            var _currentId = Todo.createItem("Wash the Car");
            Todo.updateItem(_currentId, "Fly the Plane");
            var task = Todo.getAllItems()[0].task;

			equal(task,	"Fly the Plane", 'Wash the Car Todo should be changed to Fly the Plane');
		});
		
		test('delete Item from the Todo List',function(){
            var _currentId = Todo.createItem("Wash the Car");
            var items = Todo.getAllItems();
            equal(items.length, 1, "Tasks list should have one task in it.");

            Todo.deleteItem(_currentId);
            items = Todo.getAllItems();
            equal(items.length, 0, "Tasks list should be empty.");

		});
		
		
		
	}
	return {
        run: run
    }
});