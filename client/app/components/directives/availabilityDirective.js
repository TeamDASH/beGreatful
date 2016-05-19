// beGreatfulApp.directive('availabilityValidator', 
// ['$http', function($http) {
//         return {
//             require : 'ngModel',
//             link : function(scope, element, attrs, ngModel) {
//                 var url = attrs.availabilityValidator;
                
//                 function setLoading(bool) {
//                     ngModel.$setValidity('loading', !bool);
//                 }
                
//                 function setAvailable(bool) {
//                     ngModel.$setValidity('available', bool);
//                 }
                
//                 ngModel.$parsers.push(function(reqEmail) {
//                     if (!reqEmail || reqEmail.length == 0) {
//                         return;
//                     }
                        
//                     setLoading(true);                 
//                     setAvailable(false);
                    
//                     $http.get(url + reqEmail, {})
//                         .success(function() {
//                             setLoading(false);
//                             setAvailable(true);
//                         })
//                         .error(function() {
//                             setLoading(false);
//                             setAvailable(false);
//                         });
//                     return reqEmail;
//                 });z
//             }
//         }
//     }
// ]);