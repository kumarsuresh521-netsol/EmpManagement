angular.module('starter.controllers', [])

.controller('PlaylistsCtrl', function($scope) {

})

.controller('PlaylistCtrl', function($scope, $stateParams, empdata) {
	$scope.status = $stateParams.playlistId;
	var map = null;
	var my_current_lat = null;
	var my_current_lng = null;
	document.addEventListener("deviceready", function () {
		navigator.geolocation.getCurrentPosition(function(pos) {
		
		my_current_lat = pos.coords.latitude;  //alert("lat="+my_current_lat);
		my_current_lng = pos.coords.longitude; //alert("lng="+my_current_lng);
		
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
	
		var employee_code = document.getElementById('empid').value; //alert(employee_code);
		var job_code = document.getElementById('jobid').value; //alert(job_code);
		var address = 'Chandigarh'; //alert(address);
		var device = 'android'; //alert(device);
		var selfie_image = document.getElementById('myImage').src; //alert(selfie_image);
		var latitude = my_current_lat; //alert(my_current_lat);
		var longitude = my_current_lng; //alert(longitude);
		if(!employee_code){
			alert("Please enter emp id.")
				return;
		}
		if(!job_code){
			alert("Please enter job id.")
				return;
		}
		
		empdata.savedata(employee_code, job_code, latitude, longitude, address, device, selfie_image).then(function(data) { //alert("success");
			$scope.response = data;
			
		}).finally(function(response){ //console.log(response);
			document.getElementById('empid').value = '';
			document.getElementById('jobid').value = '';
			document.getElementById('myImage').src = 'img/no-image.png';
			
		$ionicLoading.hide();
			alert("Data saved successfully.");
			$state.go('playlists')
		});
		
	}
});
