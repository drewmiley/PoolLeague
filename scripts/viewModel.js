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

	// Overall viewmodel for this screen, along with initial state
	var ReservationsViewModel = function(first, last) {
		console.log(players);
		console.log(matches);
		console.log(fixtures);
		console.log(gameWeek);

	    var self = this;

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