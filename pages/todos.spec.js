'use strict';

var todoAppPage = require('./angular.page.js');

describe('angularjs todo list', function () {

    var page;

    beforeEach(function () {
        page = new todoAppPage();
        page.get();
    });

    it('should add a todo task', function () {

        page.addNewTask('my first task');

        expect(page.todoList.count()).toEqual(1); //there is one element in the 'All' category
        expect(page.todoList.get(0).getText()).toEqual('my first task'); //element value is correct

        page.categoryActive.click(); //go to the 'Active' category
        expect(page.todoList.count()).toEqual(1); //there is one element in the 'Active' category
        expect(page.todoList.get(0).getText()).toEqual('my first task'); //element value is correct

        page.categoryCompleted.click(); //go to the 'Completed' category
        expect(page.todoList.count()).toEqual(0); //there no tasks in 'Complete' category

        page.deleteOneTask();

    });

    it('should show correct number of undone tasks', function () {

        page.addNewTask('my first task');
        expect((page.counter).getText()).toEqual('1'); //counter was set to '1'
        page.completeOneTaskButton.click(); //completing our task
        expect((page.counter).getText()).toEqual('0'); //counter was set to '0'

        page.deleteOneTask();
    });

    it('should complete a task', function () {

        page.addNewTask('my first task');
        page.completeOneTaskButton.click(); //completing our task
        expect(page.todoList.get(0).getText()).toEqual('my first task'); //task is present in 'All' category

        page.categoryActive.click(); //go to the 'Active' category
        expect(page.todoList.count()).toEqual(0); //there no tasks in 'Active' category

        page.categoryCompleted.click(); //go to the 'Complete' category
        expect(page.todoList.get(0).getText()).toEqual('my first task'); //task is present in 'Complete' category

        page.deleteOneTask();
    });

    it('should complete all tasks in one time', function () {

        page.addNewTask('buy some cheese');
        page.addNewTask('feed the cat');
        page.addNewTask('book a doctors appointment');
        page.addNewTask('0123');

        expect(page.todoList.count()).toEqual(4);
        page.completeAllTasksButton.click(); //completing our tasks
        expect(page.todoList.count()).toEqual(4); //tasks are present in 'All' category

        page.deleteAllTasks();
    });
});
