(function() {
    'use strict';

    angular.module('ngrepeat.app', ['ngAnimate'])
        .controller('MainController', ['$timeout', createMainController]);

    function createMainController($timeout) {
        /*
        *   Store the context in a variable that matches the variable used in the view for maintainability
        *   NOTE: When using controllerAs syntax the context is not the scope and is instead a property off of the
        *   controller's scope object
        */
        var main = this,
            sampleData = {
                firstNameList: [
                    'Kevin',
                    'Troy',
                    'Waseem',
                    'Jimmy',
                    'James',
                    'Rick',
                    'Mike',
                    'Justin',
                    'Aston',
                    'Dave'
                ],
                lastNameList: [
                    'Smith',
                    'Johnson',
                    'Williams',
                    'Jones',
                    'Brown',
                    'Davis',
                    'Miller',
                    'Wilson',
                    'Moore',
                    'Taylor'
                ],
                prefixList: [
                    'Mr. ',
                    'Miss. ',
                    'Mrs. ',
                    'Dr. ',
                    ''
                ],
                suffixList: [
                    'Jr.',
                    'Sr.',
                    'II',
                    'III',
                    ''
                ]
            };

        //Initialize  variables that will be used in the view

        /*
            Initialize variables that will be used in the view
            NOTE: Try to keep the scope object as light as possible to optimize client side performance
         */
        main.headerText = 'NgRepeat with AngularJS';
        main.nameLabel = 'Name: ';
        main.removeButtonText = 'Remove a Person';
        main.removeAllButtonText = 'Remove All People';
        main.addButtonText = 'Add a Person';
        main.add100ButtonText = 'Add 100 People';
        main.people = [];

        main.hasProperty = hasProperty;
        main.removePerson = removePerson;
        main.removeAllPeople = removeAllPeople;
        main.addPerson = addPerson;
        main.add100People = add100People;

        /*
            Initialization functions should be defined after the variables are initialized so that a developer can
            see the model of the view without any confusion
         */
        _populateNameData(5);
        _slickReveal();

        /*
            Don't use inline functions when possible has it can have a negative impact on future maintainability

            Example:

            ** DON'T **
            *   main.hasPrefix = function() { //Do something };

            ** DO **
            *   main.hasPrefix = hasPrefix;
            *
            *   function hasPrefix() {
            *       //Do something
            *   }
         */
        function hasProperty(person, property) {
            var propertyValue = person[property];

            return (angular.isDefined(propertyValue) && !_isEmpty(propertyValue));
        }

        function removePerson() {
            main.people.splice(0, 1);
        }

        function removeAllPeople() {
            _safelyRemoveLargeAmountsOfPeople(main.people.length);
        }

        function addPerson() {
            _populateNameData(1);
        }

        function add100People() {
            _safelyAddLargeAmountsOfPeople(100);
        }

        /*
            Any functions that are not exposed to the view should be prepended with an '_' to make them easy to
            identify.
         */
        function _isEmpty(str) {
            return str.length === 0;
        }

        function _slickReveal() {
            $timeout(function() {
                angular.element(document.body).addClass('active');
            }, 0);
        }

        function _populateNameData(numberOfPeopleToAdd) {
            var tempPrefix,
                tempSuffix,
                tempFirstName,
                tempLastName;

            for(var i = 0; i < numberOfPeopleToAdd; i++) {
                tempPrefix = _getRandomArrayValue(sampleData.prefixList);
                tempSuffix = _getRandomArrayValue(sampleData.suffixList);
                tempFirstName = _getRandomArrayValue(sampleData.firstNameList);
                tempLastName = _getRandomArrayValue(sampleData.lastNameList);

                //console.log('First name value: ', tempFirstName);
                //console.log('Last name value: ', tempLastName);

                main.people.unshift({
                    id: main.people.length + 1,
                    firstName: tempFirstName,
                    lastName: tempLastName,
                    prefix: tempPrefix,
                    suffix: tempSuffix
                });
            }
        }

        function _safelyAddLargeAmountsOfPeople(numberOfPeopleToAdd) {

            var delay,
                interval = 25;

            for(var i = 0; i < numberOfPeopleToAdd; i++) {
                delay = i * interval;
                _timeoutWrapper(delay);
            }

            function _timeoutWrapper(delay) {
                $timeout(function() {
                    _populateNameData(1);
                }, delay);
            }
        }

        function _safelyRemoveLargeAmountsOfPeople(numberOfPeopleToRemove) {
            var delay,
                interval = 25;

            for(var i = 0; i < numberOfPeopleToRemove; i++) {
                delay = i * interval;
                _timeoutWrapper(delay);
            }

            function _timeoutWrapper(delay) {
                $timeout(function() {
                    main.people.splice(0, 1);
                }, delay);
            }
        }

        function _getRandomArrayValue(arrayToAnalyze) {
            var max = arrayToAnalyze.length - 1,
                min = 0,
                randomFloatNumber = (Math.random() * (max - min) - min),
                randomNumber = randomFloatNumber < 1 ? Math.floor(randomFloatNumber) : Math.ceil(randomFloatNumber);

            return arrayToAnalyze[randomNumber];
        }
    }
})();