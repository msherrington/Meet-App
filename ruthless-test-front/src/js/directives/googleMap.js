/* global google:ignore */

angular
  .module('meetApp')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window', 'mapStyles', 'Event'];
function googleMap($window, mapStyles, Event){

  const directive = {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      // users: '=',
      events: '=', // just added this
      // query: '='
    },
    link($scope, element){
      // Declare variables for positioning markers
      let eventLat = 0;
      let eventLng = 0;
      const latLng = { lat: eventLat, lng: eventLng };
      let markers = [];
      let pos = null;

      // Creates map + sets details
      const map = new $window.google.maps.Map(element[0], {
        zoom: 15,
        scrollwheel: false,
        center: $scope.center,
        styles: mapStyles
      });

      // Event listener to close infowindows by clicking anywhere on map
      map.addListener('click', () => {
        if(infowindow) infowindow.close();
      });
      // Sets location marker on map
      const marker = new $window.google.maps.Marker({
        // position: $scope.center
        // icon: '../images/blueMarker.png',
        map
      });

      //Runs function to find latlng of all users
      // getUserLatLng();
      getEventLatLng();

      let infowindow = null;

      // Filters map markers by radius
      // function filterMarkersByRadius() {
      //   for(var i = 0; i < markers.length; i++){
      //     if(markers[i].distance <= circle.radius){
      //       markers[i].setMap(map);
      //     } else{
      //       markers[i].setMap(null);
      //     }
      //   }
      // }

      // HTML5 Geolocation..
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          pos = {
            lat: parseFloat(position.coords.latitude),
            lng: parseFloat(position.coords.longitude)
          };
          marker.setPosition(pos);
          map.setCenter(pos);
          // getEventLatLng(pos);
        }, function () {
          handleLocationError(true,  googleMap.getCenter());
        });
      } else {
      // If browser doesn't support Geolocation
        handleLocationError(false, googleMap.getCenter());
      }
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        marker.setPosition(pos);
        marker.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
      }

      // Function to plot user locations on the map
      function getEventLatLng(pos) {
        console.log('running')
        const events = $scope.events;
        console.log(events);
        // console.log(events.event[0])

        for(var i = 0; i < markers.length; i++){
          markers[i].setMap(null);
        }

        markers = [];

        // Loops through users and passes user location to addmarker function
        for (i=0; i<events.length; i++) {
          console.log('placing marker!');
          const event = events[i];
          eventLat = events[i].latitude;
          eventLng = events[i].longitude;
          addMarker(latLng, pos, event);
        }
      }

      // Adds marker to each users latlng
      function addMarker(latLng, pos, event) {
        latLng = { lat: event.latitude, lng: event.longitude };
        console.log(event)
        new google.maps.Marker({
          position: latLng,
          map: map,
          marker
          // icon: '../images/userMarker.png',
          // distance: findDistance(new google.maps.LatLng(pos), new google.maps.LatLng(latLng))
        });
      //
      //   // Event listener for user markers
      //   marker.addListener('click', () => {
      //     console.log('marker clicked');
      //     markerClick(marker, event, latLng);
      //   });
      //
      //   // Push markers into an array to use later
      //   markers.push(marker);
      // //   filterMarkersByRadius();
      }



      // function markerClick(marker, user){
      //   // Close any open infowindows
      //   if(infowindow) infowindow.close();
      //
      //   // Locate data from individual user posts
      //   const userName = user.username;
      //   const userImage = user.profilePic;
      //
      //   // Info window settings and display
      //   infowindow = new google.maps.InfoWindow({
      //     content: `
      //     <div class="infowindow">
      //     <a href="/users/${user.id}"><img src="${userImage}"></a>
      //       <a href="/users/${user.id}"><h3>${userName}</h3></a>
      //     </div>`,
      //     maxWidth: 200
      //   });
      //
      //   // Event listener for user markers
      //   marker.addListener('click', () => {
      //     markerClick(marker, user);
      //   });
      //
      //   // Open the new InfoWindow
      //   infowindow.open(map, marker);
      // }

    }
  };
  return directive;
}


// Map Style (from here to end of file)
angular
  .module('meetApp')
  .constant('mapStyles', [
    {
        'featureType': 'administrative.locality',
        'elementType': 'all',
        'stylers': [
            {
                'hue': '#ff0200'
            },
            {
                'saturation': 7
            },
            {
                'lightness': 19
            },
            {
                'visibility': 'on'
            }
        ]
    },
    {
        'featureType': 'administrative.locality',
        'elementType': 'labels.text',
        'stylers': [
            {
                'visibility': 'on'
            },
            {
                'saturation': '-3'
            }
        ]
    },
    {
        'featureType': 'administrative.locality',
        'elementType': 'labels.text.fill',
        'stylers': [
            {
                'color': '#748ca3'
            }
        ]
    },
    {
        'featureType': 'landscape',
        'elementType': 'all',
        'stylers': [
            {
                'hue': '#ff000a'
            },
            {
                'saturation': -100
            },
            {
                'lightness': 100
            },
            {
                'visibility': 'simplified'
            }
        ]
    },
    {
        'featureType': 'poi',
        'elementType': 'all',
        'stylers': [
            {
                'hue': '#ff0200'
            },
            {
                'saturation': '23'
            },
            {
                'lightness': '20'
            },
            {
                'visibility': 'off'
            }
        ]
    },
    {
        'featureType': 'poi.school',
        'elementType': 'geometry.fill',
        'stylers': [
            {
                'color': '#ffdbda'
            },
            {
                'saturation': '0'
            },
            {
                'visibility': 'on'
            }
        ]
    },
    {
        'featureType': 'road',
        'elementType': 'geometry',
        'stylers': [
            {
                'hue': '#ff0200'
            },
            {
                'saturation': '100'
            },
            {
                'lightness': 31
            },
            {
                'visibility': 'simplified'
            }
        ]
    },
    {
        'featureType': 'road',
        'elementType': 'geometry.stroke',
        'stylers': [
            {
                'color': '#f39247'
            },
            {
                'saturation': '0'
            }
        ]
    },
    {
        'featureType': 'road',
        'elementType': 'labels',
        'stylers': [
            {
                'hue': '#008eff'
            },
            {
                'saturation': -93
            },
            {
                'lightness': 31
            },
            {
                'visibility': 'on'
            }
        ]
    },
    {
        'featureType': 'road.arterial',
        'elementType': 'geometry.stroke',
        'stylers': [
            {
                'visibility': 'on'
            },
            {
                'color': '#ffe5e5'
            },
            {
                'saturation': '0'
            }
        ]
    },
    {
        'featureType': 'road.arterial',
        'elementType': 'labels',
        'stylers': [
            {
                'hue': '#bbc0c4'
            },
            {
                'saturation': -93
            },
            {
                'lightness': -2
            },
            {
                'visibility': 'simplified'
            }
        ]
    },
    {
        'featureType': 'road.arterial',
        'elementType': 'labels.text',
        'stylers': [
            {
                'visibility': 'off'
            }
        ]
    },
    {
        'featureType': 'road.local',
        'elementType': 'geometry',
        'stylers': [
            {
                'hue': '#ff0200'
            },
            {
                'saturation': -90
            },
            {
                'lightness': -8
            },
            {
                'visibility': 'simplified'
            }
        ]
    },
    {
        'featureType': 'transit',
        'elementType': 'all',
        'stylers': [
            {
                'hue': '#e9ebed'
            },
            {
                'saturation': 10
            },
            {
                'lightness': 69
            },
            {
                'visibility': 'on'
            }
        ]
    },
    {
        'featureType': 'water',
        'elementType': 'all',
        'stylers': [
            {
                'hue': '#e9ebed'
            },
            {
                'saturation': -78
            },
            {
                'lightness': 67
            },
            {
                'visibility': 'simplified'
            }
        ]
    }
]);
