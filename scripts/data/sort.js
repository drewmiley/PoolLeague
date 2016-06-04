define([], function() {

	function Sort(name, value, sort) {
		var self = this;
		self.name = name;
		self.value = value;
		self.sort = sort;
	}

	var sortDirections = [new Sort("Asc", "Asc", true),
		new Sort("Desc", "Desc", false)];
	
	var sortOptions = [new Sort("Pts", "Pts", function(left, right) {
			return left.points - right.points;
		}),
		new Sort("Name", "Name", function(left, right) {
			if (left.name.toLowerCase() < right.name.toLowerCase()) {
				return 1;
			} else if (left.name.toLowerCase() > right.name.toLowerCase()) {
				return -1;
			} else {
				return 0;
			}
		}),
		new Sort("Played", "Played", function(left, right) {
			return left.played - right.played;
		}),
		new Sort("Bonus", "Bonus", function(left, right) {
			return left.bonus - right.bonus;
		}),
		new Sort("Won", "Won", function(left, right) {
			return left.won - right.won;
		}),
		new Sort("Drew", "Drew", function(left, right) {
			return left.drew - right.drew;
		}),
		new Sort("Lost", "Lost", function(left, right) {
			return left.lost - right.lost;
		}),
		new Sort("Frames Won", "Frames Won", function(left, right) {
			return left.framesWon - right.framesWon;
		}),
		new Sort("Frames Lost", "Frames Lost", function(left, right) {
			return left.framesLost - right.framesLost;
		})
	];

	return {
		directions: sortDirections,
		options: sortOptions
	};
})