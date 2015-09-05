"use strict";
define(function(require) {

    var Todo = require('modules/Todo');

    var run = function() {

        describe("Todo Module", function() {

            beforeEach(function() {
                Todo.init();
            });

            it('should start with an empty todo list.', function(){
                var items = Todo.getAllItems();
                expect(items).toEqual([]);
            });

            it('should have one item in the todo list when a task is added.', function() {
                Todo.createItem("Wash the Car");
                var items = Todo.getAllItems();
                var todoString = items[0].task;

                expect(items.length).toEqual(1);
                expect(todoString).toEqual("Wash the Car");
            });

            it('should return a list of all of the items added.', function() {
                Todo.createItem("Walk the Dog");
                Todo.createItem("Buy Milk");
                var items = Todo.getAllItems();

                expect(items.length).toEqual(2);
                expect(items[0].task).toEqual("Walk the Dog");
            });

            it('should update a task by its id.', function() {
                var _currentId = Todo.createItem("Wash the Car");
                Todo.updateItem(_currentId, "Fly the Plane");
                var task = Todo.getAllItems()[0].task;

                expect(task).toEqual("Fly the Plane");
            });

            it('should delete an item from the todo list.', function() {
                var _currentId = Todo.createItem("Wash the Car");
                var items = Todo.getAllItems();

                expect(items.length).toEqual(1);

                Todo.deleteItem(_currentId);
                items = Todo.getAllItems();
                expect(items.length).toEqual(0);
            });

        });

    };
    
    return {
        run: run
    }
});