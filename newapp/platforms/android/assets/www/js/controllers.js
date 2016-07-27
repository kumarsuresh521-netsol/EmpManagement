angular.module('starter.controllers', [])

.controller('PlaylistsCtrl', function($scope) {

})

.controller("PlaylistCtrl", ['$scope', '$stateParams', '$cordovaFileTransfer', '$cordovaDevice', '$ionicLoading', 'empdata', function ($scope, $stateParams, $cordovaFileTransfer, $cordovaDevice, $ionicLoading, empdata) {
	$scope.status = $stateParams.playlistId;
	var map = null;
	var my_current_lat = null;
	var my_current_lng = null;
	var uuid = $cordovaDevice.getUUID();
	var address = '';
	var img = '';
	var options = {};
	
	document.addEventListener("deviceready", function () {
		 
		navigator.geolocation.getCurrentPosition(function(pos) {
		
			my_current_lat = pos.coords.latitude;
			my_current_lng = pos.coords.longitude;
			
			var geocoder = new google.maps.Geocoder();
			var latlng = new google.maps.LatLng(my_current_lat, my_current_lng);
			var request = {
				latLng: latlng
			};
			geocoder.geocode(request, function(data, status) {
			if (status == google.maps.GeocoderStatus.OK) {
			  if (data[0] != null) {
				address = data[0].formatted_address;
			  } else {
				address = '';
			  }
			}
			})
		});
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
			destinationType: Camera.DestinationType.FILE_URL 
		});

		function onSuccess(imageURI) {
			window.resolveLocalFileSystemURL(imageURI, function(fileEntry) {
				img = fileEntry.nativeURL;
  			});
		}
		
		function onFail(message) {
			alert('Failed because: ' + message);
		}
	  }, false);
	};
	
	$scope.SubmitData = function($scope, $state) {
		
		var employee_code = document.getElementById('empid').value;
		var job_code = document.getElementById('jobid').value; 
		var device = uuid;
		var selfie_image = '';
		var latitude = my_current_lat;
		var longitude = my_current_lng;
		var notification_type = $stateParams.playlistId;
		if(!employee_code){
			alert("Please enter emp id.")
				return;
		}
		if(!job_code){
			alert("Please enter job id.")
				return;
		}
	
			
		$ionicLoading.show();
		empdata.savedata(employee_code, job_code, latitude, longitude, address, device, selfie_image, notification_type).then(function(data) {
			if(data.id){
					var fileURL = img;
					var options = {};
					options.fileKey = "selfie_image";
					options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
					options.mimeType = "image/jpeg";
					options.chunkedMode = true; 
					var params = {};
					params.id = data.id;

					options.params = params;
					$cordovaFileTransfer.upload('http://162.243.94.122/upload.php/', fileURL, options)
					  .then(function(result) {
						
					  }, function(err) { 
						
					  }, function (progress) {
						
					  });
			}
		}).finally(function(response, $state){
		$ionicLoading.hide();
			document.getElementById('empid').value = '';
			document.getElementById('jobid').value = '';
			
			alert("Data saved successfully.");
			window.location.href = '#playlists';
		  }, false);
	}
}]);
