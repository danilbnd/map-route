; (function () {
	'use strict';

	// Initialize and add the map
	function initBaMap() {
		let directionsService = new google.maps.DirectionsService();
		let directionsRenderer = new google.maps.DirectionsRenderer();
		
		let mapCenter = {
			lat: 49.5880552,
			lng: 34.5476484
		}

		let mapEl = document.getElementById('map');

		let mapOptions = {
			zoom: 7,
			center: mapCenter
		};

		let $baMap = new google.maps.Map(mapEl, mapOptions); // create map

		directionsRenderer.setMap($baMap);

		let onChangeHandler = function () {
			calculateAndDisplayRoute(directionsService, directionsRenderer);
		};

		document.querySelector('.ba-form').addEventListener('submit', function (e) {
			e.preventDefault();
		});
		document.querySelector('.ba-form').addEventListener('submit', onChangeHandler); // calculate route

		function calculateAndDisplayRoute(directionsService, directionsRenderer) { // add name town, contry and mode travel 
			directionsService.route({
				origin: document.querySelector('.ba-start').value,
				destination: document.querySelector('.ba-end').value,
				travelMode: 'DRIVING'
			},
			function (response, status) {
				if (status === 'OK') {
					 directionsRenderer.setDirections(response);
				} else {
					 window.alert('Directions request failed due to ' + status);
				}
		  });
		}
	}
	window.addEventListener('load', initBaMap);

})();