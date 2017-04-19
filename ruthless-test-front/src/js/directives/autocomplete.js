angular.module('ruthless-test-front')
  .directive('autocomplete', autocomplete);

autocomplete.$inject = ['$window'];
function autocomplete($window) {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      lat: '=',
      lng: '='
    },
    link: function(scope, element, attrs, model) {
      const options = {
        types: []
      };

      const autocomplete = new $window.google.maps.places.Autocomplete(element[0], options);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        scope.lat = place.geometry.location.toJSON().lat;
        scope.lng = place.geometry.location.toJSON().lng;
        model.$setViewValue(element.val());
      });
    }
  };
}
