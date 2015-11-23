(function() {
    'use strict';

    angular.module('directive.app', ['ngAnimate'])
        .controller('MainController', ['$timeout', function($timeout) {
            var main = this;

            main.headerText = 'AngularJS Directives';
            main.inputValue = '';

            main.isNotNumber = isNotNumber;
            main.isEmpty = isEmpty;

            _slickReveal();
            //_canvasFun();

            function isNotNumber(val) {
                return (/[a-zA-Z]/g.test(val) || angular.isUndefined(val) || val === '');
            }

            function isEmpty(val) {
                console.log('isEmpty: ', (angular.isUndefined(val) || val === ''));
                return (angular.isUndefined(val) || val === '');
            }

            function _slickReveal() {
                $timeout(function() {
                    angular.element(document.body).addClass('active');
                }, 0);
            }

            function _canvasFun() {
                var canvas = document.getElementById('test');
                var context;

                if(canvas.getContext) {
                    var context = canvas.getContext('2d');

                    context.strokeStyle = "rgba(25, 25, 25, 0)";
                    context.fillStyle = "rgba(135, 75, 170, 0)";
                    context.lineWidth = 4;
                    context.beginPath();
                    context.arc(100,100,50,0,Math.PI*2,true);
                    context.closePath();
                    context.stroke();
                    context.fill();

                    var fadeDuration = 1000;
                    var fadeInterval = fadeDuration/10;

                    setInterval(function() {
                        fadeIn(fadeDuration);
                        setTimeout(function() {
                            fadeOut(fadeDuration);
                        }, 2000);
                    }, 4000);
                }

                function fadeIn(duration) {
                    var fadeInDuration = duration/10000;
                    clearCanvas();

                    setCanvasState(fadeInDuration);

                    if(fadeInDuration < 1) {
                        setTimeout(function() {
                            fadeIn(duration += fadeInterval);
                        }, 2);
                    }
                }

                function fadeOut(duration) {
                    clearCanvas();

                    setCanvasState(duration/fadeDuration);

                    if(duration > 0) {
                        setTimeout(function() {
                            fadeOut(duration -= fadeInterval);
                        }, 2);
                    } else {
                        clearCanvas();
                    }
                }

                function clearCanvas() {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                }

                function setCanvasState(amount) {
                    context.strokeStyle = 'rgba(25, 25, 25, ' + amount + ')';
                    context.fillStyle = 'rgba(135, 75, 170, ' + amount + ')';
                    context.lineWidth = 4;
                    context.beginPath();
                    context.arc(100,100,50,0,Math.PI*2,true);
                    context.closePath();
                    context.stroke();
                    context.fill();
                }
            }
        }])
        .directive('advancedInput', [function() {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    element.on('keydown', function(e) {
                        var code = e.keyCode || e.which;
                        var empty = '';

                        if(_isEsc(code)) {
                            element.val(empty);

                            if(attrs.ngModel) {
                                _setScopeValue(attrs.ngModel, empty);
                            }
                        }
                    });

                    function _isEsc(code) {
                        return code === 27;
                    }

                    function _setScopeValue(objPath, value) {
                        var keys = objPath.split('.');
                        var parentObj = _find.call(scope, keys);

                        parentObj[keys.slice(-1)] = value;
                        scope.$digest();

                        function _find(keys) {
                            var value = this;

                            for(var i = 0; i < keys.length; i++) {
                                if(i+1 === keys.length) { break; }

                                value = value[keys[i]];
                            }

                            return value;
                        }
                    }
                }
            }
        }])
        .directive('requiredForm', [function() {
            return {
                restrict: 'A',
                replace: true,
                scope: {
                    requiredForm: '=',
                    requiredMessage: '@',
                    placeholder: '@',
                    dataModel: '=ngModel',
                    passedId: '@id'
                },
                templateUrl: 'partials/requiredForm-part.html',
                link: function(scope) {
                    scope.shouldShowRequired = function() {
                        return scope.requiredForm;
                    };
                }
            };
        }]);
})();