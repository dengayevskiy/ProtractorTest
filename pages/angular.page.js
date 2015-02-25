'use strict';

var todoAppPage = function () {

    this.newTodo = element(by.model('newTodo'));
    this.todoList = element.all(by.repeater('todo in todos'));
    this.deleteButtons = element.all(by.className('destroy'));
    this.deleteButton = element.all(by.className('destroy')).get(0);
    this.viewArea = element.all(by.model('todo.completed')).get(0);
    this.categoryAll = element(by.id('footer')).element(by.linkText('All'));
    this.categoryActive = element(by.id('footer')).element(by.linkText('Active'));
    this.categoryCompleted = element(by.id('footer')).element(by.linkText('Completed'));
    this.counter = element(by.id('todo-count')).element(by.className('ng-binding'));
    this.completeOneTaskButton = element(by.model('todo.completed'));
    this.completeAllTasksButton = element(by.model('allChecked'));
    var _this = this;

    this.get = function () {
        browser.get('#/');
    };

    this.addNewTask = function (taskName) {
        this.newTodo.sendKeys(taskName);
        this.newTodo.sendKeys(protractor.Key.ENTER);
    };

    this.deleteOneTask = function () {
        this.categoryAll.click(); //go to 'All' category
        browser.driver.actions().mouseMove(this.viewArea).perform().then(function () { //hover and delete single task
            _this.deleteButton.click();
        });

        expect(this.todoList.count()).toEqual(0);
    };

    this.deleteAllTasks = function () {
        this.categoryAll.click(); //go to 'All' category
        browser.driver.actions().mouseMove(this.viewArea).perform().then(function () { //hover and delete until there will be no tasks
            _this.deleteButtons.count().then(function (count) {
                while (count > 0) {
                    _this.deleteButton.click();
                    count--
                }
            });
        });
        expect(this.todoList.count()).toEqual(0);
    };
};

module.exports = todoAppPage;