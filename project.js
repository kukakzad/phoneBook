angular.module('project', [])
  .controller('projectCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.state = 'showList';
    $scope.index = 0;
    $scope._id = '';
    $scope.members=[];
    $scope.loadData = function(){  
      $http.get('/api/show').
        success(function(data, status, headers, config) {
          $scope.members = data;
        }).
        error(function(data, status, headers, config) {
          $scope.error = data;
        });
    };
    $scope.loadData();
    $scope.changeState = function(state){
      $scope.state = state;
    };
    $scope.addPhonebook =function(inputNameSurname,inputphoneNumber) {
      var tmp = {
        name: inputNameSurname,
        numberPhone: inputphoneNumber
      };
      $http.get('/api/add/',{params : tmp}).
        success(function(data, status, headers, config) {
          $scope.loadData();
          $scope.inputNameSurname = '';
          $scope.inputphoneNumber = '';
        }).
        error(function(data, status, headers, config) {
          $scope.error = data;
        });
      $scope.state = 'showList';
    };
    $scope.editPhonebook = function(member){
      $scope.state = 'editList';
      // $scope._id = _id;
      $scope.member = member;      
      $scope.inputNameSurname = $scope.member.name;
      $scope.inputphoneNumber = $scope.member.numberPhone;  
    };

    $scope.updateData = function(member,inputNameSurname,inputphoneNumber){
      console.log(member._id);
      $scope.state = 'showList';
      var tmp = {
        name: inputNameSurname,
        numberPhone: inputphoneNumber
      };
      $http.get('/api/update/'+member._id,{params : tmp}).
        success(function(data, status, headers, config) {
          $scope.loadData();
          $scope.inputNameSurname = '';
          $scope.inputphoneNumber = '';
        }).
        error(function(data, status, headers, config) {
          $scope.error = data;
        });
    };
    $scope.removePhonebook = function(_id) {
      $scope.state = 'showList';
      $http.get('/api/remove/'+_id).
        success(function(data, status, headers, config) {
          $scope.loadData();
          $scope.inputNameSurname = '';
          $scope.inputphoneNumber = '';
        }).
        error(function(data, status, headers, config) {
          $scope.error = data;
        });
    };  
  }]);