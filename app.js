var google = {
	visualization: {
		Query: {
			setResponse: function(data) {
				//$scope.spreadsheet = data;
				//return data;
				for (var i = 0; i < data.table.rows.length; i++) {
					var row = data.table.rows[i];
					angular.element(document.body).scope().items.push(row.c[0].v);
				}
			}
		}
	}
};

angular.module('app', ['ngMaterial'])
  .controller('AppCtrl', ['$scope', '$interval', '$http', '$location',
    function($scope, $interval, $http, $location) {
		var timer;
		$scope.seconds = 60;
		$scope.progress = 100;
		$scope.index = -1;
		$scope.items = [];

		$http.jsonp("https://docs.google.com/spreadsheets/d/" + $location.search().key  + "/gviz/tq");

		$scope.pad = function(n, width, z) {
			z = z || '0';
			n = n + '';
			return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
		}

		$scope.tick = function () {
			if ($scope.seconds > 0) {
				$scope.seconds--;
				$scope.progress = Math.round(100 / 60 * $scope.seconds);
			} else {
				if($scope.index < $scope.items.length - 1) {
					$scope.next();
				} else {
					$interval.cancel(timer);
				}
			}
		}

		$scope.next = function() {
			if($scope.index === -1) {
				timer = $interval($scope.tick, 1000);
			}
			$scope.index++;
			$scope.seconds = 60;
			$scope.progress = 100;
		}

		// start the countdown
    }
  ]);
