var Quotr = angular.module('Quotr', [])

Quotr.controller('controller', ['$scope', 'facto', function($scope, facto) {

	// Quote - textarea, required
	// Author - input type="text"
	// submit ng-click=submitQuote

	$scope.quoteList = facto.preloads

	$scope.textError = false
	$scope.authorError = false

	$scope.authorFilter = ''

	$scope.showPopUp = false
	$scope.rando = ''

	$scope.submitQuote = function() {
		$scope.verifyQuotes()
		if ($scope.textError || $scope.authorError) { return; }
		var quote = new facto.Quote($scope.text, $scope.author)
		$scope.quoteList.push(quote)
		$scope.text = ''
		$scope.author = ''
	}

	$scope.verifyQuotes = function() {
		if ($scope.text.length > 1) 	{ $scope.textError   = false }
		else 				{ $scope.textError   = true  }
		if ($scope.author.length > 1) 	{ $scope.authorError = false }
		else 				{ $scope.authorError = true  }
	}

	$scope.deleteQuote = function(quote) {
		var index = $scope.quoteList.indexOf(quote)
		$scope.quoteList.splice(index, 1)
	}

	$scope.rateQuote = function(quote, rating) {
		quote.rate(rating)
	}
// Fun ways to display
	$scope.authorFilter = ''

	$scope.updateFilter = function(author) {
		$scope.authorFilter = author
	}

	$scope.randomQuote = function() {
		var index = Math.floor(Math.random() * $scope.quoteList.length)
		$scope.rando = $scope.quoteList[index]
		$scope.showPopUp = true
	}



	$scope.hideRandomQuote = function() {
		$scope.showPopUp = false
	}

}])

Quotr.factory('facto', function() {

	var Quote = function(text, author) {
		this.text = text
		this.author = author
		this.score = undefined
		this.ratings = []
	}

	Quote.prototype = {
		rate: function(rating) {
			this.ratings.push(rating)
			this.calcScore()
		},
		calcScore: function() {
			var total = this.ratings.reduce(function(a,b) {
				return a + b
			})
			this.score = total / this.ratings.length
		}
	}

	var preloads = []
	preloads.push(new Quote('Everything should be made as simple as possible, but not simpler.', 'Albert Einstein'))

	preloads.push(new Quote('Style is whatever you want to do, if you can do it with confidence.', 'George Clinton'))

	preloads.push(new Quote('Free your mind and your ass will follow.', 'George Clinton'))

	preloads.push(new Quote('Sometimes we get so caught up in language, and \'this\' word and \'that\' word, that we lose site of the bigger problems in the world. At one time, the word \'Bitch\' simply meant female dog. Now, it has a negative meaning. Many negative words in one time and/or culture are meaningless in another. We\'ve got to stop wasting time fighting over nonsense. I\'m still waiting for aliens to come.', 'George Clinton'))

	preloads.push(new Quote('We are guided by interests rather than feelings in dealing with our partners.', 'Vladimir Putin'))

	preloads.push(new Quote('My name is Sparkles!', 'Sparkles'))


	return {
		Quote : Quote,
		preloads : preloads
	}

})