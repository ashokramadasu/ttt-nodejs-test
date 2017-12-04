var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {

    $scope.onSubmit = function(){
            $scope.Index = "";
            $scope.Word  = "";
            $scope.Count = "";

            let requestBody = {
                Number : $scope.number
    	      };
    $http.post("/test",requestBody)
    .then(function(response) {
        $scope.tableData = response.data;
        $scope.tableName = "Most frequent "+$scope.number+" words from the file";
        $scope.Index = "Index";
        $scope.Word = "Word";
        $scope.Count = "Count";
    });
    }
});
