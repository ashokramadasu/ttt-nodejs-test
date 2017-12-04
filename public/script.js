var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {

    $scope.onSubmit = function(){
//             $scope.Index = "";
//             $scope.Word  = "";
//             $scope.Count = "";
           let  num = $scope.number;
            if(num < 0){
                    alert("Please enter + ve Number");
                    return;
                 }
           	let requestBody = {
               Number : num
    	    };
    $http.post("/test",requestBody)
    .then(function(response,status) {
          if(typeof(response.data)== "object"){
           $scope.tableName = "Most frequent "+num+" words from the file";
            $scope.Index     = "Index";
            $scope.Word      = "Word";
            $scope.Count     = "Count";
            $scope.tableData  = response.data;
            $scope.error="";
           }

          else{
            $scope.tableData = [];
            $scope.tableName = "";
            $scope.Index     = "";
            $scope.Word      = "";
            $scope.Count     = "";
            $scope.error = response.data;
       }
    }, function errorCallback(data) {
         //return response.status
         alert(data)  
    });
    }
});
