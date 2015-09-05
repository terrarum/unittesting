/**
 * Main To Do module.
 */

define(function(require) {

    var $ = require('jquery');
    var Utils = require('modules/Utils');
    var taskModel = require('models/taskModel');
    var $list = $('.js-todo-list');
    var $doneList = $('.js-done-list');
    var $todoCount = $('.js-todo-count');
    var $doneCount = $('.js-done-count');

    var items = [];

    /**
     * Returns an item by it's ID.
     *
     * @param id
     * @returns {object} - Task item.
     * @private
     */
    var _getItemById = function(id) {
        for (var i = 0, len = items.length; i < len; i++) {
            if (items[i].id === id) {
                return items[i]
            }
        }
    };

    /**
     * Returns an item's index by its ID.
     *
     * @param id
     * @returns {number} - item's index in items array.
     * @private
     */
    var _getItemIndexById = function(id) {
        for (var i = 0, len = items.length; i < len; i++) {
            if (items[i].id === id) {
                return i
            }
        }
    };

    /**
     * Create a new item with the given task string';
     *
     * @param task
     * @returns {string} - ID of created item.
     * @private
     */
    var _createItem = function(task) {
        var newItem = taskModel();
        newItem.id = Utils.GUID();
        newItem.task = task;
        items.push(newItem);

        Object.observe(newItem, _render);

        return newItem.id;
    };

    /**
     * Delete a item with the given ID.
     *
     * @param id
     * @private
     */
    var _deleteItem = function(id) {
        var itemIndex = _getItemIndexById(id);
        items.splice(itemIndex, 1);
    };

    /**
     * Update item with given task string.
     *
     * @param id
     * @param item
     * @private
     */
    var _updateItem = function(id, task) {
        var item = _getItemById(id);
        item.task = task;
    };

    /**
     * Returns the items array.
     *
     * @returns {Array}
     * @private
     */
    var _getAllItems = function() {
        return items;
    };

    /**
     * Toggle done status of given item.
     *
     * @param id
     * @private
     */
    var _toggleDone = function(id) {
        var item = _getItemById(id);
        item.isDone = !item.isDone;
    };

    /**
     * Return markup for a item.
     *
     * @param {object} item
     * @param {boolean} todo
     * @returns {string}
     */
    var itemTemplate = function(item, todo) {

        var checked  = item.isDone ? 'checked' : '';

        var h = '<li class="item js-item" data-id="'+ item.id + '">' +
            '<input type="checkbox" name="vehicle" value="Bike" ' + checked + ' />' +
            '<span class="js-item-task">' + item.task + '</span>' +
            '<span class="glyphicon glyphicon-remove button delete-button js-delete-button"></span>';

        if(todo) {
            h += '<span class="glyphicon glyphicon-pencil button edit-button js-edit-button"></span>';
        }

        h += '</li>';

        return h;
    };

    /**
     * Toggles the task's `contenteditable` property.
     *
     * @param el - the edit button element
     * @private
     */
    var _toggleEditable = function(el) {
        var taskContainer = $(el).parent().children('.js-item-task');

        var isEditable = $(taskContainer).hasClass('editable');
        $(taskContainer).prop('contenteditable', !isEditable).toggleClass('editable');aa
    };

    /**
     * Initialise the module.
     *
     * @private
     */
    var _init = function() {
        _render();
		items = [];

        $('.js-todos-container')
            /**
             * Toggle done status of item.
             */
            .on('change', '.js-item > input', function() {
                var itemId = $(this).parent().attr('data-id');
                _toggleDone(itemId);
            })

            /**
             * Edit item.
             */
            .on('click', '.js-edit-button', function() {
                _toggleEditable(this);
            })

            /**
             * Save edited task.
             */
            .on('keydown', '.js-item-task', function(ev) {
                if (ev.keyCode === 13) {
                    ev.preventDefault();

                    var updatedTask = $(this).html();

                    if (updatedTask.length > 0) {
                        var id = $(this).parent().attr('data-id');

                        _updateItem(id, updatedTask);
                        _toggleEditable($(this).parent().children('.js-edit-button')[0]);
                    }
                }
            })

            /**
             * Delete the selected task.
             */
            .on('click', '.js-delete-button', function() {
                var id = $(this).parent().attr('data-id');
                _deleteItem(id);
            });

        /**
         * Form for adding new items.
         */
        $('.js-newitem').on('keydown', function(ev) {
            if (ev.keyCode === 13) {
                var newTask = $(this).val();
                if (newTask.length > 0) {
                    _createItem(newTask);
                    $(this).val("");
                }
            }
        });
        Object.observe(items, _render);
    };

    /**
     * Empty list and render items.
     *
     * @private
     */
    var _render = function() {
        var todoTemplate = '', doneTemplate = '', todo = 0, done = 0;

        for(var i = 0; i < items.length; i++) {
            if(items[i].isDone) {
                doneTemplate += itemTemplate(items[i], false);
                done++;
            } else {
                todoTemplate += itemTemplate(items[i], true);
                todo++;
            }
        }

        $list.empty().append(todoTemplate);
        $doneList.empty().append(doneTemplate);

        $todoCount.html(todo);
        $doneCount.html(done);
    };

    return {
        init: function() {
            _init();
        },
        createItem: function(task) {
            return _createItem(task);
        },
        deleteItem: function(id) {
            _deleteItem(id);
        },
        updateItem: function(id, task) {
            _updateItem(id, task)
        },
        toggleDone: function(id) {
            _toggleDone(id);
        },
        getAllItems: function() {
            return _getAllItems();
        }
    }

});