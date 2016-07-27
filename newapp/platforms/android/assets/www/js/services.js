angular.module('starter.services', [])

.factory('empdata', function($q, $http) {

	return({
		savedata: savedata
	});
	
	function savedata(employee_code, job_code, latitude, longitude, address, device, selfie_image, notification_type){
		data = 'data={"employee_code":"'+employee_code+'","job_code":"'+job_code+'","latitude":"'+latitude+'","longitude":"'+longitude+'","address":"'+address+'","device":"'+device+'","selfie_image":"'+selfie_image+'","notification_type":"'+notification_type+'"}';
		/*var request = $http.post("http://162.243.94.122/index.php",{
                    data: data
                });
		return( request.then( handleSuccess, handleError ) );
		*/
		var request = $http.post('http://162.243.94.122/index.php', data,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});

		return( request.then( handleSuccess, handleError ) );
	}
	
	function handleError( response ) { console.log(response);
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