var app = angular.module('eureka', [
  'eureka.services',
  'eureka.auth',
  'eureka.home',
  'ui.router'
])

app.config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /signup
  $urlRouterProvider.otherwise("/login");
  // Routing States
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "app/views/home.html",
      controller: "HomeController"
    })
    .state('signup', {
      url: "/signup",
      templateUrl: "app/views/signup.html",
      controller: "AuthController"
    })
    .state('login', {
      url: "/login",
      templateUrl: "app/views/login.html",
      controller: "AuthController"
    })
});