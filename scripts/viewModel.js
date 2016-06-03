define(['ko', 'players', 'matches', 'fixtures', 'gameWeek'], function(ko, players, matches, fixtures, gameWeek) {

	    // Class to represent a row in the seat reservations grid
	function SeatReservation(name, initialMeal) {
	    var self = this;
	    self.name = name;
	    self.meal = ko.observable(initialMeal);

	    self.formattedPrice = ko.computed(function() {
	        var price = self.meal().price;
	        return price ? "$" + price.toFixed(2) : "None";        
	    });    
	}

	// see this for table sorting
	// http://jsfiddle.net/kohenkatz/RT7J4/

	function CompletedFixtureScore(playerID, score) {
		var self = this;
		self.playerID = playerID;
		self.score = score;
	}

	function formCompletedFixtureScores(matches, fixtures) {
		var completedFixtureScores = [];
		for (var i = 0; i < matches.length; i++) {
			var match = matches[i];
			var correspondingFixture = fixtures.filter(function(fixture) { return fixture.id === match.fixtureID; })[0];
			completedFixtureScores.push(new CompletedFixtureScore(correspondingFixture.homePlayerID, match.homeScore));
			completedFixtureScores.push(new CompletedFixtureScore(correspondingFixture.awayPlayerID, match.awayScore));
		}
		return completedFixtureScores;
	}

	function LeagueTableRow(name, played, won, drew, lost, pointsFor, pointsAgainst, bonus, points) {
		var self = this;
		self.name = name;
		self.played = played;
		self.won = won;
		self.drew = drew;
		self.lost = lost;
		self.pointsFor = pointsFor;
		self.pointsAgainst = pointsAgainst;
		self.bonus = bonus;
		self.points = points;
	}

	function calculateLeagueTableRow(name, scores) {
		var played = scores.length;

		var numericScores = scores.filter(function(score) { return !isNaN(parseFloat(score)); });
		var numberOfWalkovers = played - numericScores.length;

		var won = numberOfWalkovers + numericScores.filter(function(score) { return score > 3; }).length;
		var drew = numericScores.filter(function(score) { return score === 3; }).length;
		var lost = numericScores.filter(function(score) { return score < 3; }).length;

		var pointsFor = 6 * numberOfWalkovers + numericScores.reduce(function(a, b) { return a + b; }, 0);
		var pointsAgainst = 6 * played - numericScores.reduce(function(a, b) { return a + b; }, 0);

		var bonus = numericScores.filter(function(score) { return score === 6; }).length;

		var points = 3 * won + drew + pointsFor + bonus;

		return new LeagueTableRow(name, played, won, drew, lost, pointsFor, pointsAgainst, bonus, points);
	}

	function formLeagueTableRow(player, completedFixtures) {
		var playerScores = completedFixtures.filter(function(completedFixture) { return completedFixture.playerID === player.id; })
			.map(function(completedFixture) { return completedFixture.score; });
		return calculateLeagueTableRow(player.name, playerScores);
	}

	function formLeagueTable(players, matches, fixtures) {
		var completedFixtures = formCompletedFixtureScores(matches, fixtures);
		var leagueTableRows = [];
		for (var i = 0; i < players.length; i++) {
			leagueTableRows.push(formLeagueTableRow(players[i], completedFixtures));
		}
		return leagueTableRows;
	}

	// Overall viewmodel for this screen, along with initial state
	var ReservationsViewModel = function(first, last) {
	    var self = this;
	    self.players = ko.observable(players);
	    self.matches = ko.observable(matches);
	    self.fixtures = ko.observable(fixtures);
	    self.gameWeek = ko.observable(gameWeek);

	    var leagueTableRows = formLeagueTable(players, matches, fixtures);
	    self.leagueTableRows = ko.observable(leagueTableRows);

	    this.firstName = ko.observable(first);
        this.lastName = ko.observable(last);
     
        this.fullName = ko.computed(function() {
            return this.firstName() + " " + this.lastName();
        }, this);

	    // Non-editable catalog data - would come from the server
	    self.availableMeals = [
	        { mealName: "Standard (sandwich)", price: 0 },
	        { mealName: "Premium (lobster)", price: 34.95 },
	        { mealName: "Ultimate (whole zebra)", price: 290 }
	    ];    

	    // Editable data
	    self.seats = ko.observableArray([
	        new SeatReservation("Steve", self.availableMeals[0]),
	        new SeatReservation("Bert", self.availableMeals[0])
	    ]);

	    // Computed data
	    self.totalSurcharge = ko.computed(function() {
	       var total = 0;
	       for (var i = 0; i < self.seats().length; i++)
	           total += self.seats()[i].meal().price;
	       return total;
	    });    

	    // Operations
	    self.addSeat = function() {
	        self.seats.push(new SeatReservation("", self.availableMeals[0]));
	    }
	    self.removeSeat = function(seat) { self.seats.remove(seat) }


	}
     
    return ReservationsViewModel;
});