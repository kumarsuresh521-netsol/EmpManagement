angular.module('starter.services', [])

.factory('empdata', function($q, $http) {

	return({
		savedata: savedata
	});
	
	function savedata(employee_code, job_code, latitude, longitude, address, device, selfie_image){
					
		var request = $http.post("http://162.243.94.122/index.php",{
                    employee_code: employee_code,
                    job_code: job_code, 
                    latitude: latitude,
					longitude: longitude, 
                    device: device,
					selfie_image: selfie_image
                });
		return( request.then( handleSuccess, handleError ) );
	}
	
	function handleError( response ) {
	   if (
			! angular.isObject( response.data ) ||
			! response.data.message
			) { console.log("Check service handleError function. your services call return error");
			return( $q.reject( "An unknown error occurred." ) );
		}
		 return( $q.reject( response.data.message ) );
	}
	
	function handleSuccess( response ) {
		return( response.data );
	}
})