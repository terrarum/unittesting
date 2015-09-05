"use strict";
define(function(require) {

    var Todo = require('modules/Todo');

	var run = function() {
        describe("Todo Module", function() {

            beforeEach(function() {
                Todo.init();
            });

            describe('Creating a task list.', function() {
                it('Should start with an empty todo list.', function() {
                    var items = Todo.getAllItems();

                    items.length.should.equal(0);
                });
            });

            describe('Adding an item to the task list.', function() {
                it('Should have the item "Wash the Car" when an item is added.', function() {
                    Todo.createItem("Wash the Car");
                    var items = Todo.getAllItems();
                    var todoString = items[0].task;

                    items.length.should.equal(1);
                    todoString.should.equal("Wash the Car");
                })
            });

            describe('Getting the list of items.', function() {
                it('Should return the list of items.', function() {
                    Todo.createItem("Walk the Dog");
                    Todo.createItem("Buy Milk");
                    var items = Todo.getAllItems();

                    items.length.should.equal(2);
                    items[0].task.should.equal('Walk the Dog');
                })
            });

            describe('Updating a task.', function() {
                it('Should change "Wash the Car" to "Fly the Plane".', function() {
                    var _currentId = Todo.createItem("Wash the Car");
                    Todo.updateItem(_currentId, "Fly the Plane");
                    var task = Todo.getAllItems()[0].task;

                    task.should.equal('Fly the Plane');
                });
            });

            describe('Deleting a task.', function() {
               it('Should delete a task by its ID.', function() {
                   var _currentId = Todo.createItem("Wash the Car");
                   var items = Todo.getAllItems();

                   items.length.should.equal(1);

                   Todo.deleteItem(_currentId);
                   items = Todo.getAllItems();
                   items.length.should.equal(0);
               });
            });
        })
	};

	return {
        run: run
    }
});