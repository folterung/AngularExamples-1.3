(function () {
    'use strict';

    angular.module('binding.app', ['ngAnimate'])
        .controller('MainController', ['$timeout', createMainController]);

    //Define the MainController function
    function createMainController($timeout) {
        //Store the context in a variable that matches the reference on the view to make it easier to follow
        var main = this;

        _slickReveal();

        //Create a default value for the description property (Prevents confusion)
        main.description = '';
        main.descriptionLabel = 'Description';
        main.headerText = 'Binding with AngularJS';

        //Define the functions extended to the view
        //NOTE: When the controller gets larger this makes it much easier to follow the code logic.
        main.descriptionCheck = descriptionCheck;

        //Define functions
        function descriptionCheck() {
            return angular.isDefined(main.description) && !_isEmpty(main.description);
        }

        //Functions that are not exposed should be denoted with an '_' in front of their name
        function _slickReveal() {
            $timeout(function() {
                angular.element(document.body).addClass('active');
            }, 0);
        }

        function _isEmpty(str) {
            return str.length === 0;
        }
    }
})();