var Quotr = angular.module('Quotr', [])

Quotr.controller('controller', ['$scope', 'facto', function($scope, facto) {

	$scope.quoteList 	= facto.preloads
	
	// var locStorage = window.localStorage
	// locStorage.setItem('quoteList', facto.preloads)

	// console.log(facto.preloads)
	// console.log(locStorage.quoteList)

	$scope.textError 	= false
	$scope.authorError 	= false

	$scope.undoQueue 	= []

	$scope.authorFilter = ''

	$scope.showPopUp 	= false
	$scope.rando 		= ''

	$scope.submitQuote = function() {
		$scope.verifyQuotes()
		if ($scope.textError || $scope.authorError) { return; }
		var quote = new facto.Quote($scope.text, $scope.author)
		$scope.quoteList.push(quote)
		$scope.text   = ''
		$scope.author = ''
	}

	$scope.verifyQuotes = function() {
		$scope.textError 	= Boolean(!$scope.text)
		$scope.authorError 	= Boolean(!$scope.author)
	}

	$scope.deleteQuote = function(quote) {
		var index = $scope.quoteList.indexOf(quote)
		$scope.undoQueue.push($scope.quoteList.splice(index, 1)[0])
		console.log($scope.undoQueue)
	}

	$scope.undoDelete = function() {
		$scope.quoteList.push($scope.undoQueue.pop())
	}

	$scope.rateQuote = function(quote, rating) {
		quote.rate(rating)
	}
// Fun ways to display
	$scope.updateFilter = function(author) {
		if ($scope.authorFilter) {
			$scope.authorFilter = ''
		} else {
			$scope.authorFilter = author
		}
	}

	$scope.randomQuote = function() {
		var index        = Math.floor(Math.random() * $scope.quoteList.length)
		$scope.rando     = $scope.quoteList[index]
		$scope.showPopUp = true
	}

	$scope.hideRandomQuote = function() {
		$scope.showPopUp = false
	}

}])

Quotr.factory('facto', function() {

	var Quote = function(text, author) {
		this.text    = text
		this.author  = author
		this.score 	 = ' '
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
			this.score = (total / this.ratings.length).toFixed(1)
		}
	}

	var preloads = []
	preloads.push(new Quote(
		'Everything should be made as simple as possible, but not simpler.', 
		'Albert Einstein'
	))

	preloads.push(new Quote(
		'Style is whatever you want to do, if you can do it with confidence.', 
		'George Clinton'
	))

	preloads.push(new Quote(
		'Free your mind and your ass will follow.', 
		'George Clinton'
	))

	preloads.push(new Quote(
		'We are guided by interests rather than feelings in dealing with our partners.', 
		'Vladimir Putin'
	))

	preloads.push(new Quote(
		'My name is Sparkles!', 
		'Sparkles'
	))

	preloads.push(new Quote(
		'Suck a fart, bro!',
		'Jacob Duvall'
	))


	return {
		Quote    : Quote,
		preloads : preloads
	}

})