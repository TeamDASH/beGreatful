var availabilityValidator = angular.module('availabilityValidator', []);

availabilityValidator.directive('availabilityValidator', 
['$http', function($http) {
        return {
            require : 'ngModel',
            link : function(scope, element, attrs, ngModel) {
                var url = attrs.availabilityValidator + '/';
                
                function setLoading(bool) {
                    ngModel.$setValidity('loading', !bool);
                }
                
                function setAvailable(bool) {
                    ngModel.$setValidity('available', bool);
                }
                
                console.log('trying to do directive stuff');
                
                ngModel.$parsers.push(function(reqEmail) {
                    if (!reqEmail || reqEmail.length == 0) {
                        return;
                    }
                        
                    setLoading(true);                 
                    setAvailable(false);
                    
                        $http.get(url + reqEmail, {})
                        .then(function(response) {
                            console.log(response.data);
                            if (response.data.error) {
                                console.log('setting error message to show');
                                setLoading(false);
                                setAvailable(false);
                            } else {
                                setLoading(false);
                                setAvailable(true);
                            }
                        });
                    return reqEmail;
                });
            }
        }
    }
]);