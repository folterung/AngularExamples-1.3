(function() {
    'use strict';

    angular.module('controller.app', ['ngAnimate'])
        .controller('MainController', ['$timeout', createMainController])
        .controller('ParentControllerUsingControllerAs', [createParentControllerUsingControllerAs])
        .controller('ChildControllerUsingControllerAs', [createChildControllerUsingControllerAs])
        .controller('ParentController', ['$scope', createParentController])
        .controller('ChildController', ['$scope', createChildController]);

    /*
         If a controller is defined with the controllerAs syntax the context is "this".
         This means that you don't need to pass the $scope into the controller.
     */
    function createMainController($timeout) {
        var main = this;

        main.headerText = 'Controllers with AngularJS';

        _slickReveal();

        function _slickReveal() {
            $timeout(function() {
                angular.element(document.body).addClass('active');
            }, 0);
        }
    }

    function createParentControllerUsingControllerAs() {
        var controllerAsParent = this;

        controllerAsParent.msgLabel = 'controllerAsParent msg: ';
        controllerAsParent.msg = 'I am the main controller!!';

        controllerAsParent.msgTwoLabel = 'controllerAsParent msgTwo: ';
        controllerAsParent.msgTwo = 'This message will not leak through';
    }

    function createChildControllerUsingControllerAs() {
        var controllerAsChild = this;

        controllerAsChild.msgLabel = 'controllerAsChild msg: ';
        controllerAsChild.msg = 'Child ONE!';

        controllerAsChild.msgTwoLabel = 'controllerAsChild msgTwo: ';
    }

    /*
        If a controller is defined without the controllerAs syntax you must pass the scope into the controller
     */
    function createParentController($scope) {
        $scope.msgLabel = 'parentController msg';
        $scope.msg = 'Child TWO!';

        $scope.msgTwoLabel = 'parentController msgTwo: ';
        $scope.msgTwo = 'Oops... this message leaked through';
    }

    function createChildController($scope) {
        $scope.msgLabel = 'childController msg: ';
        $scope.msg = 'Child THREE!';

        $scope.msgTwoLabel = 'childController msgTwo: ';
    }
})();