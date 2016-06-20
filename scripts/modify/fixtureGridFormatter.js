define(['data/matches', 'data/fixtures'],
	function(matches, fixtures) {

	return function fixtureGridFormatter(firstPlayerID, secondPlayerID) {
		if (firstPlayerID === secondPlayerID) {
			return 'X';
		}

		var homeFixture = fixtures.filter(function(fixture) {
			return fixture.homePlayerID === firstPlayerID && fixture.awayPlayerID === secondPlayerID;
		});

		var awayFixture = fixtures.filter(function(fixture) {
			return fixture.homePlayerID === secondPlayerID && fixture.awayPlayerID === firstPlayerID;
		});

		var formattedFixture = '';

		if (homeFixture.length === 1) {
			var match = matches.filter(function(match) { return match.fixtureID === homeFixture[0].id });
			return match.length === 0 ? homeFixture[0].gameWeek : match[0].homeScore + ' - ' + match[0].awayScore;
		} else if (awayFixture.length === 1) {
			var match = matches.filter(function(match) { return match.fixtureID === awayFixture[0].id });
			return match.length === 0 ? awayFixture[0].gameWeek : match[0].awayScore + ' - ' + match[0].homeScore;
		}

		return formattedFixture;
	}

})