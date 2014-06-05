'use strict';

angular.module('mean.services').controller('ServicesController', ['$scope', '$stateParams', '$location', 'Global', 'Services',
    function($scope, $stateParams, $location, Global, Services) {
        $scope.global = Global;
        $scope.package = {
            name: 'services'
        };

		var date = new Date();
	    var d = date.getDate();
	    var m = date.getMonth();
	    var y = date.getFullYear();

	    /* event source that pulls from google.com */
	    $scope.eventSource = {
	            url: 'http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic',
	            className: 'gcal-event',           // an option!
	            currentTimezone: 'America/Chicago' // an option!
	    };
	    /* event source that contains custom events on the scope */
	    $scope.events = [
	      {title: 'All Day Event',start: new Date(y, m, 1)},
	      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
	      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
	      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
	      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
	      {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
	    ];
	    /* event source that calls a function on every view switch */
	    $scope.eventsF = function (start, end, callback) {
	      var s = new Date(start).getTime() / 1000;
	      var m = new Date(start).getMonth();
	      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
	      callback(events);
	    };

	    /* alert on eventClick */
	    $scope.alertOnEventClick = function( event, allDay, jsEvent, view ){
	        $scope.alertMessage = (event.title + ' was clicked ');
	    };


	    /* Change View */
	    $scope.changeView = function(view,calendar) {
	      calendar.fullCalendar('changeView',view);
	    };
	    /* Change View */
	    $scope.renderCalender = function(calendar) {
	      if(calendar){
	        calendar.fullCalendar('render');
	      }
	    };
	    /* config object */
	    $scope.uiConfig = {
	      calendar:{
	        height: 450,
	        editable: true,
	        header:{
	          left: 'prev',
	          center: 'title',
	          right: 'next'
	        },
	        eventClick: $scope.alertOnEventClick,
	        eventDrop: $scope.alertOnDrop,
	        eventResize: $scope.alertOnResize
	      }
	    };

	    /* event sources array*/
	    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    }
]);
