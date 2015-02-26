'use strict';

var todoAppPage = function () {

    this.newTodoInput = element(by.model('newTodo'));
    this.todoList = element.all(by.repeater('todo in todos'));
    this.deleteButtons = element.all(by.className('destroy'));
    this.deleteButton = element.all(by.className('destroy')).get(0);
    this.viewArea = element.all(by.model('todo.completed')).get(0);
    this.categoryAll = element(by.id('footer')).element(by.linkText('All'));
    this.categoryActive = element(by.id('footer')).element(by.linkText('Active'));
    this.categoryCompleted = element(by.id('footer')).element(by.linkText('Completed'));
    this.counter = element(by.id('todo-count')).element(by.className('ng-binding'));
    this.completeOneTaskButton = element(by.model('todo.completed'));
    this.completeAllTasksCheck = element(by.model('allChecked'));
    this.footer = element(by.id('footer'));
    this.body = element(by.id('main'));
    this.editInput = element(by.className('edit'));
    this.doubleClickArea = element(by.className('view')).element(by.className('ng-binding'));
    this.clearCompletedButton = element(by.id('clear-completed'));

    var _this = this;

    this.get = function () {
        browser.get('#/');
    };

    this.addNewTask = function (taskName) {
        this.newTodoInput.sendKeys(taskName);
        this.newTodoInput.sendKeys(protractor.Key.ENTER);
    };

    this.editTaskAndSubmit = function (taskName) {
        browser.actions().doubleClick(this.doubleClickArea).perform().then(function () {
            expect(_this.hasClass(_this.todoList.get(0), 'editing')).toBe(true);
            _this.editInput.clear();
            _this.editInput.sendKeys(taskName);
            _this.editInput.sendKeys(protractor.Key.ENTER);
        });
    };

    this.editTaskAndCancel = function (taskName) {
        browser.actions().doubleClick(this.doubleClickArea).perform().then(function () {
            expect(_this.hasClass(_this.todoList.get(0), 'editing')).toBe(true);
            _this.editInput.clear();
            _this.editInput.sendKeys(taskName);
            _this.editInput.sendKeys(protractor.Key.ESCAPE);
        });
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

    this.hasClass = function (element, cls) {
        return element.getAttribute('class').then(function (classes) {
            return classes.split(' ').indexOf(cls) !== -1;
        });
    };
};

module.exports = todoAppPage;