'use strict';

var todoAppPage = require('./angular.page.js');

var page;

beforeEach(function () {
    page = new todoAppPage();
    page.get();
});

describe('New Task', function () {

    it('should add a task', function () {
        page.addNewTask('my first task');

        page.deleteOneTask();
    });

    it('should show #main and #footer items when there are tasks', function () {
        page.addNewTask('my first task');

        expect(page.footer.isDisplayed()).toBe(true);
        expect(page.body.isDisplayed()).toBe(true);

        page.deleteOneTask();

    });

    it('should clean input field after task was added', function () {
        page.addNewTask('my first task');

        expect(page.newTodo.getText()).toEqual('');

        page.deleteOneTask();

    });
});

describe('Counter', function () {

    it('should show correct number of undone tasks', function () {
        page.addNewTask('my first task');
        expect((page.counter).getText()).toEqual('1'); //counter was set to '1'
        page.completeOneTaskButton.click(); //completing our task
        expect((page.counter).getText()).toEqual('0'); //counter was set to '0'

        page.deleteOneTask();
    });
});

describe('Existing Tasks', function () {

    it('should mark task as done', function () {
        page.addNewTask('my first task');
        page.completeOneTaskButton.click(); //completing our task

        expect(element(by.css('.completed')).getText()).toEqual('my first task');
        expect(page.hasClass(page.todoList.get(0), 'completed')).toBe(true);

        page.deleteOneTask();
    });

    it('should mark task as undone', function () {
        page.addNewTask('my first task');
        page.completeOneTaskButton.click(); //completing our task
        page.completeOneTaskButton.click(); //undone

        expect(page.hasClass(page.todoList.get(0), 'completed')).toBe(false);

        page.deleteOneTask();
    });

    it('should allow to edit a task', function () {
        page.addNewTask('my task to edit');
        page.editTaskAndSubmit('edited task');

        expect(page.todoList.get(0).getText()).toEqual('edited task');

        page.deleteOneTask();
    });

    it('should cancel edits on Escape', function () {
        page.addNewTask('my task to edit');
        page.editTaskAndCancel('edited task');

        expect(page.todoList.get(0).getText()).toEqual('my task to edit');

        page.deleteOneTask();
    });

    it('should remove task if an empty text string was entered', function () {
        page.addNewTask('my task to edit');

        page.editTaskAndSubmit('');

        expect(page.todoList.count(0));
    });

});

describe('Check all', function () {

    it('should mark all items as completed', function () {
        page.addNewTask('buy some cheese');
        page.addNewTask('book a doctors appointment');
        page.addNewTask('0123');
        page.completeAllTasksCheck.click(); //completing our tasks

        expect(page.completeAllTasksCheck.isSelected()).toBe(true);
        expect(page.hasClass(page.todoList.get(0), 'completed')).toBe(true);
        expect(page.hasClass(page.todoList.get(1), 'completed')).toBe(true);
        expect(page.hasClass(page.todoList.get(2), 'completed')).toBe(true);

        page.deleteAllTasks();
    });

    it('should clear the completion state of all items', function () {
        page.addNewTask('buy some cheese');
        page.addNewTask('book a doctors appointment');
        page.addNewTask('0123');
        page.completeAllTasksCheck.click(); //completing our tasks
        page.completeAllTasksCheck.click();

        expect(page.completeAllTasksCheck.isSelected()).toBe(false);
        expect(page.hasClass(page.todoList.get(0), 'completed')).toBe(false);
        expect(page.hasClass(page.todoList.get(1), 'completed')).toBe(false);
        expect(page.hasClass(page.todoList.get(2), 'completed')).toBe(false);

        page.deleteAllTasks();
    });

    it('should not clear the completion state of already completed tasks', function () {
        page.addNewTask('buy some cheese');
        page.addNewTask('book a doctors appointment');
        page.addNewTask('0123');
        page.viewArea.click();
        page.completeAllTasksCheck.click(); //completing our tasks

        expect(page.completeAllTasksCheck.isSelected()).toBe(true);
        expect(page.hasClass(page.todoList.get(0), 'completed')).toBe(true);
        expect(page.hasClass(page.todoList.get(1), 'completed')).toBe(true);
        expect(page.hasClass(page.todoList.get(2), 'completed')).toBe(true);

        page.deleteAllTasks();
    });

});

describe('Category', function () {

    it('should display undone tasks in correct categories', function () {
        page.addNewTask('my undone task');

        expect(page.todoList.count()).toEqual(1); //there is one element in the 'All' category
        expect(page.todoList.get(0).getText()).toEqual('my undone task'); //element value is correct

        page.categoryActive.click(); //go to the 'Active' category
        expect(page.todoList.count()).toEqual(1); //there is one element in the 'Active' category
        expect(page.todoList.get(0).getText()).toEqual('my undone task'); //element value is correct

        page.categoryCompleted.click(); //go to the 'Completed' category
        expect(page.todoList.count()).toEqual(0); //there no tasks in 'Complete' category

        page.deleteOneTask();
    });

    it('should display completed tasks in correct categories', function () {
        page.addNewTask('my completed task');
        page.completeOneTaskButton.click(); //completing our task

        expect(page.todoList.count()).toEqual(1); //there is one element in the 'All' category
        expect(page.todoList.get(0).getText()).toEqual('my completed task'); //element value is correct

        page.categoryActive.click(); //go to the 'Active' category
        expect(page.todoList.count()).toEqual(0); //there is no elements in 'Active' category

        page.categoryCompleted.click(); //go to the 'Completed' category
        expect(page.todoList.count()).toEqual(1); //there one tasks in 'Completed' category
        expect(page.todoList.get(0).getText()).toEqual('my completed task');

        page.deleteOneTask();
    });

    it('should highlight the current category', function () {
        page.addNewTask('my completed task');
        expect(page.hasClass(page.categoryAll, 'selected'));

        page.categoryActive.click();
        expect(page.hasClass(page.categoryActive, 'selected'));

        page.categoryCompleted.click();
        expect(page.hasClass(page.categoryCompleted, 'selected'));

        page.deleteOneTask();
    });

});
