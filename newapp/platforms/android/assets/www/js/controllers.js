angular.module('starter.controllers', [])

.controller('PlaylistsCtrl', function($scope) {

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
	$scope.status = $stateParams.playlistId; alert("sdf");
	
	document.addEventListener("deviceready", function () {
		navigator.geolocation.getCurrentPosition(function(pos) {  alert("lksdjf");
		
		var my_current_lat = pos.coords.latitude; 
		var my_current_lng = pos.coords.longitude;
		
		var map = null;
		var marker = new google.maps.Marker();
		
		my_static_latlng = new google.maps.LatLng(my_current_lat, my_current_lng);
					
		var mapOptions = {
			center: my_static_latlng,
			zoom: 12,
			zoomControl: true,
			  mapTypeControl: true,
			  scaleControl: true,
			  streetViewControl: false,
			  rotateControl: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
 
		map = new google.maps.Map(document.getElementById("map"), mapOptions);  
		addMarker(location, map);
			
		});
		
		
			  // Adds a marker to the map.
		
		function addMarker(location, map) {
			var marker = new google.maps.Marker();
			marker.setMap(null);          
			marker = new google.maps.Marker({
				position: location,
				draggable: true,
				zoom: 18,
				animation: google.maps.Animation.DROP
			});
			marker.setMap(map);           
		}
	}, false);
	
	$scope.ClickImage = function() {
		document.addEventListener("deviceready", function () {

		var options = {
		  quality: 50,
		  destinationType: Camera.DestinationType.DATA_URL,
		  sourceType: Camera.PictureSourceType.CAMERA,
		  allowEdit: true,
		  encodingType: Camera.EncodingType.JPEG,
		  targetWidth: 100,
		  targetHeight: 100,
		  popoverOptions: CameraPopoverOptions,
		  saveToPhotoAlbum: false,
		  correctOrientation:true
		};

		navigator.camera.getPicture(onSuccess, onFail, { 
			quality: 50,
			destinationType: Camera.DestinationType.FILE_URI 
		});

		function onSuccess(imageURI) {
			var image = document.getElementById('myImage');
			image.src = imageURI;
		}
		
		function onFail(message) {
			alert('Failed because: ' + message);
		}
	  }, false);
	};
	
	$scope.SubmitData = function($scope, $state) {
		
		var empid = $scope.empid;
		var jobid = $scope.jobid;
		var img = $scope.img;
		if(!empid){
			alert("Please enter emp id.")
				return;
		}
		if(!jobid){
			alert("Please enter job id.")
				return;
		}
		document.getElementById("empid").val= "";
		document.getElementById("jobid").val= "";
		document.getElementById("jobid").src= "img/no-image.png";
		document.getElementById("map").html= "";
		
		alert("Thank. Infomation Successfully updated.");
		$state.go("playlists");
		navigator.app.exitApp();
	}
});
