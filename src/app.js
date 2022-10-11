const app = angular.module("myApp", []);

app.service("auth", function () {
  const users = [
    {
      login: "admin",
      password: "admin",
    },
  ];
  let badLogins = 0;
  this.getBadLogins = () => badLogins;
  this.addBadLogins = () => {
    badLogins += 1;
  };
  this.checkUser = (user) => {
    const resultName = users.find((obj) => obj.login === user.login);
    if (!resultName) return "name";
    if (resultName.password !== user.password) return "password";
    return resultName;
  };
});

app.controller("authController", function ($scope, auth) {
  $scope.currentUser = { login: "undefined" };
  $scope.getBadLogins = auth.getBadLogins();
  $scope.ifBad = false;
  $scope.message = "";
  $scope.danger = "";
  $scope.submitForm = () => {
    const result = auth.checkUser($scope.user);
    if (result === "name" || result === "password") {
      $scope.message = result === "name" ? "Ошибка в имени" : "Ошибка в пароле";
      auth.addBadLogins();
    } else {
      $scope.currentUser = result;
    }
    if (auth.getBadLogins() == 10) {
      $scope.ifBad = true;
      $scope.danger = "Попытка взлома";
    }
  };
});
