define([], function() {

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

	return {
		formLeagueTable: formLeagueTable
	};
})