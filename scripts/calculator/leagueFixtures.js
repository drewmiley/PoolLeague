define(['data/players', 'data/matches', 'data/fixtures'],
	function(players, matches, fixtures) {

	function LeagueFixture(gameWeek, homePlayer, homeScore, awayPlayer, awayScore) {
		var self = this;
		self.gameWeek = gameWeek;
		self.homePlayer = homePlayer;
		self.homeScore = homeScore;
		self.awayPlayer = awayPlayer;
		self.awayScore = awayScore;
	}

	return function formLeagueFixtures() {
		var leagueFixtures = [];

		for (var i = 0; i < fixtures.length; i++) {
			var homeScore = null;
			var awayScore = null;
			for (var j = 0; j < matches.length; j++) {
				var matchArray = matches.filter(function(match) { return match.fixtureID === fixtures[i].id; });
				if (matchArray.length === 1) {
					homeScore = matchArray[0].homeScore;
					awayScore = matchArray[0].awayScore;
				}
			}
			leagueFixtures.push(new LeagueFixture(fixtures[i].gameWeek,
				players.filter(function(player) { return player.id === fixtures[i].homePlayerID; })[0].name, homeScore,
				players.filter(function(player) { return player.id === fixtures[i].awayPlayerID; })[0].name, awayScore));
		}
		return leagueFixtures;
	}

})