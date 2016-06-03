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

	function formLeagueTable(players, matches, fixtures) {
		return [new LeagueTableRow('Drew', 1, 1, 1, 1, 1, 1, 1, 1),
			new LeagueTableRow('Drew', 1, 1, 1, 1, 1, 1, 1, 1),
			new LeagueTableRow('Drew', 1, 1, 1, 1, 1, 1, 1, 1)];
	}

	// Overall viewmodel for this screen, along with initial state
	var ReservationsViewModel = function(first, last) {
		console.log(players);
		console.log(matches);
		console.log(fixtures);
		console.log(gameWeek);

	    var self = this;
	    self.players = ko.observable(players);
	    self.matches = ko.observable(matches);
	    self.fixtures = ko.observable(fixtures);
	    self.gameWeek = ko.observable(gameWeek);

	    var leagueTableRows = formLeagueTable(self.players, self.matches, self.fixtures);
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