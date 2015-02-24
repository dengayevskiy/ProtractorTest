describe('angularjs todo list', function () {

    var addNewTask = function (taskName) {
        element(by.model('newTodo')).sendKeys(taskName);
        element(by.model('newTodo')).sendKeys(protractor.Key.ENTER);
    };

    var deleteAllTasks = function () {

        var todoList = element.all(by.repeater('todo in todos'));
        var deleteButton = element.all(by.className('destroy')).get(0);
        var viewArea = element.all(by.model('todo.completed')).get(0);
        var deleteButtons = element.all(by.className('destroy'));

        element(by.id('footer')).element(by.linkText('All')).click(); //go to 'All' category
        browser.driver.actions().mouseMove(viewArea).perform().then(function () { //hover and delete until there will be no tasks
            deleteButtons.count().then(function (count) {
                while (count > 0) {
                    deleteButton.click();
                    count--
                }
            });
        });
        expect(todoList.count()).toEqual(0);
    };

    var deleteOneTask = function () {

        var todoList = element.all(by.repeater('todo in todos'));
        var deleteButton = element.all(by.className('destroy'));
        var viewArea = element(by.model('todo.completed'));

        element(by.id('footer')).element(by.linkText('All')).click(); //go to 'All' category
        browser.driver.actions().mouseMove(viewArea).perform().then(function () { //hover and delete single task
            deleteButton.click();
        });

        expect(todoList.count()).toEqual(0);
    };

    beforeEach(function () {
        browser.get('http://todomvc.com/examples/angularjs');
    });

    /*afterEach(function() {
     deleteOneTask();
     });*/

    it('should add a todo task', function () {

        addNewTask('my first task');
        var todoList = element.all(by.repeater('todo in todos'));
        expect(todoList.count()).toEqual(1); //there is one element in the 'All' category
        expect(todoList.get(0).getText()).toEqual('my first task'); //element value is correct

        element(by.id('footer')).element(by.linkText('Active')).click(); ////go to the 'Active' category
        expect(todoList.count()).toEqual(1); //there is one element in the 'Active' category
        expect(todoList.get(0).getText()).toEqual('my first task'); //element value is correct

        element(by.id('footer')).element(by.linkText('Completed')).click(); ////go to the 'Completed' category
        expect(todoList.count()).toEqual(0); //there no tasks in 'Complete' category

        deleteOneTask();
    });

    it('should show correct number of undone tasks', function () {

        addNewTask('my first task');
        expect(element(by.id('todo-count')).element(by.className('ng-binding')).getText()).toEqual('1'); //counter was set to '1'
        element(by.model('todo.completed')).click(); //completing our task
        expect(element(by.id('todo-count')).element(by.className('ng-binding')).getText()).toEqual('0'); //counter was set to '0'

        deleteOneTask();
    });

    it('should complete a task', function () {

        addNewTask('my first task');
        var todoList = element.all(by.repeater('todo in todos'));
        element(by.model('todo.completed')).click(); //completing our task
        expect(todoList.get(0).getText()).toEqual('my first task'); //task is present in 'All' category

        element(by.id('footer')).element(by.linkText('Active')).click(); //go to the 'Active' category
        expect(todoList.count()).toEqual(0); //there no tasks in 'Active' category

        element(by.id('footer')).element(by.linkText('Completed')).click(); //go to the 'Complete' category
        expect(todoList.get(0).getText()).toEqual('my first task'); //task is present in 'Complete' category

        deleteOneTask();
    });

    it('should complete all tasks in one time', function () {

        addNewTask('1');
        addNewTask('2');
        addNewTask('3');

        var todoList = element.all(by.repeater('todo in todos')).count();

        element(by.model('allChecked')).click(); //completing our tasks
        expect(todoList).toEqual(3); //tasks are present in 'All' category

        deleteAllTasks();
    });
});
