define(['ko', 'players', 'matches', 'fixtures', 'gameWeek'], function(ko, players, matches, fixtures, gameWeek) {

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

	function LeagueTableRow(name, played, won, drew, lost, framesWon, framesLost, bonus, points) {
		var self = this;
		self.name = name;
		self.played = played;
		self.won = won;
		self.drew = drew;
		self.lost = lost;
		self.framesWon = framesWon;
		self.framesLost = framesLost;
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
		var pointsAgainst = 6 * played - 6 * numberOfWalkovers - numericScores.reduce(function(a, b) { return a + b; }, 0);

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

	function Sort(name, value, sort) {
		var self = this;
		self.name = name;
		self.value = value;
		self.sort = sort;
	}

	function Sorter(sortOptions, tableRows) {
		var self = this;
		self.tableRows = tableRows;

		self.options = ko.observableArray(sortOptions);
		self.directions = ko.observableArray([new Sort("Desc", "Desc", true),
			new Sort("Asc", "Asc", false)]);

		self.currentOption = ko.observable(self.options()[0]);
		self.currentDirection = ko.observable(self.directions()[0]);

		self.orderedRows = ko.computed(function() {
			var tableRows = self.tableRows();
			var sortOption = self.currentOption();
			var sortDirection = self.currentDirection();

			if (sortOption == null || sortDirection == null) {
				return tableRows;
			}

			return SortArray(tableRows.slice(0, tableRows.length),
				sortDirection.sort,
				sortOption.sort);
		});
	}

	function SortArray(array, direction, comparison) {

		for (var i = 0; i < array.length; i++) {
			var original = array[i];
			for (var j = i + 1; j < array.length; j++) {
				var swap = array[j];

				if (comparison(original, swap) === direction) {
					array[j] = original;
					array[i] = swap;
					original = swap;
				}
			}
		}

		return array;
	}

	var ViewModel = function(first, last) {
	    var self = this;
	    self.players = ko.observable(players);
	    self.matches = ko.observable(matches);
	    self.fixtures = ko.observable(fixtures);
	    self.gameWeek = ko.observable(gameWeek);

	    var leagueTableRows = formLeagueTable(players, matches, fixtures);
	    self.leagueTableRows = ko.observableArray(leagueTableRows);

		var sortOptions = [new Sort("Pts", "Pts", function(left, right) {
				return left.points < right.points;
			}),
			new Sort("Name", "Name", function(left, right) {
				return left.name.toLowerCase() < right.name.toLowerCase();
			}),
			new Sort("Played", "Played", function(left, right) {
				return left.played < right.played;
			}),
			new Sort("Bonus", "Bonus", function(left, right) {
				return left.bonus < right.bonus;
			}),
			new Sort("Won", "Won", function(left, right) {
				return left.won < right.won;
			}),
			new Sort("Drew", "Drew", function(left, right) {
				return left.drew < right.drew;
			}),
			new Sort("Lost", "Lost", function(left, right) {
				return left.lost < right.lost;
			}),
			new Sort("Frames Won", "Frames Won", function(left, right) {
				return left.framesWon < right.framesWon;
			}),
			new Sort("Frames Lost", "Frames Lost", function(left, right) {
				return left.framesLost < right.framesLost;
			})
		];

		self.leagueTableSorter = new Sorter(sortOptions, self.leagueTableRows);
	}
     
    return ViewModel;
});