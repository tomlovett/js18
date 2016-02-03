var Quotr = angular.module('Quotr', [])

Quotr.controller('controller', ['$scope', 'facto', function($scope, facto) {

	// Quote - textarea, required
	// Author - input type="text"
	// submit ng-click=submitQuote

	// "You smart, you loyal"
	// -Man (click to see all)

	// 

}])

Quotr.factory('facto', function() {

	var Quote = function(text, author) {
		this.text = text
		this.author = author
		this.show = true
	}

})