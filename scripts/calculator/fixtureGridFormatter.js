define(['data/matches', 'data/fixtures'],
	function(matches, fixtures) {

	function LeagueFixture(gameWeek, homePlayer, homeScore, awayPlayer, awayScore) {
		var self = this;
		self.gameWeek = gameWeek;
		self.homePlayer = homePlayer;
		self.homeScore = homeScore;
		self.awayPlayer = awayPlayer;
		self.awayScore = awayScore;
	}

	return function fixtureGridFormatter(firstPlayerId, secondPlayerId) {
		return firstPlayerId * secondPlayerId;
	}

})