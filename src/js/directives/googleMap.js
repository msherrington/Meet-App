/* global google:ignore */

angular
  .module('meetApp')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window', 'mapStyles'];
function googleMap($window, mapStyles){

  const directive = {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      events: '='
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
        center: { lat: 51.5089891, lng: -0.0874529 },
        styles: mapStyles
      });

      // Event listener to close infowindows by clicking anywhere on map
      map.addListener('click', () => {
        if(infowindow) infowindow.close();
      });
      // Sets location marker on map
      const marker = new $window.google.maps.Marker({
        icon: '/images/locationMarker.png',
        map
      });

      //Runs function to find latlng of all events
      // getUserLatLng();
      getEventLatLng();

      let infowindow = null;

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
        });
      }

      // Function to plot event locations on the map
      function getEventLatLng(pos) {
        const events = $scope.events;

        for(var i = 0; i < markers.length; i++){
          markers[i].setMap(null);
        }

        markers = [];

        // Loops through events and passes event location to addmarker function
        for (i=0; i<events.length; i++) {
          const event = events[i];
          eventLat = events[i].latitude;
          eventLng = events[i].longitude;
          addMarker(latLng, pos, event);
        }
      }

      // Adds marker to each events latlng
      function addMarker(latLng, pos, event) {
        latLng = { lat: parseFloat(event.latitude), lng: parseFloat(event.longitude) };
        const marker = new google.maps.Marker({
          position: latLng,
          map: map
        });

        // Event listener for event markers
        marker.addListener('click', () => {
          markerClick(marker, event, latLng);
        });

        // Push markers into an array to use later
        markers.push(marker);
      }

      function markerClick(marker, event){
        // Close any open infowindows
        if(infowindow) infowindow.close();

        // Locate data from individual event posts
        const eventName = event.name;
        const eventImage = event.image_src;

        // Info window settings and display
        infowindow = new google.maps.InfoWindow({
          content: `
          <div class="infowindow">
          <a href="/events/${event.id}"><img class="infowind" src="${eventImage}"></a>
            <a href="/events/${event.id}"><h3>${eventName}</h3></a>
          </div>`,
          maxWidth: 200
        });

        // Open the new InfoWindow
        infowindow.open(map, marker);
      }

      // Updates markers within radius on map according to filter results
      $scope.$watch('events', () => {
        getEventLatLng(pos);
      });

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
