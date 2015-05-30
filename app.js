angular.module('project', ['project.service'])
  .controller('projectCtrl', ['$scope', 'members', function($scope, members) {

    $scope.members = [];

    Grades.getAll(function(data){
      $scope.members = data;
    });

    // $scope.edit = function(grade) {
    //   Grades.edit(grade, function(data){
    //     // Grades.getAll(function(data){
    //     //   $scope.grades = data;
    //     // });
    //   });
    // };

    // $scope.delete = function(_id){
    //   Grades.delete(_id, function(data){
    //     Grades.getAll(function(data){
    //       $scope.grades = data;
    //     });
    //   });
    // };

    $scope.addGrade = function(inputSubject,inputCredit,inputGrade) {
      Grades.addGrade(inputSubject,inputCredit,inputGrade, function(data){
        Grades.getAll(function(data){
          $scope.grades = data;
        });
      });
    };

    // $scope.gradeCal = function() {
    //   var sumCredit = 0;
    //   var sumGrades = 0;

    //   for (var i = 0; i < $scope.grades.length; i++) {
    //     var grade = $scope.grades[i];
    //     sumCredit += grade.credit * 1;
    //     sumGrades += ($scope.gradeConvert(grade.grade) * grade.credit);
    //   }
    //   return (sumGrades / sumCredit).toFixed(2);
    // };

    // $scope.gradeConvert = function(grade) {
    //   switch (grade) {
    //     case "A":
    //       return 4;
    //     case "B+":
    //       return 3.5;
    //     case "B":
    //       return 3;
    //     case "C+":
    //       return 2.5;
    //     case "C":
    //       return 2;
    //     case "D+":
    //       return 1.5;
    //     case "D":
    //       return 1;
    //     case "F":
    //       return 0;
    //     default:
    //       return 0;
    //   }
    // };

  }]);