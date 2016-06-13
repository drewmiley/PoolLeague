define(['calculator/fixtureGridFormatter', 'calculator/gameWeek', 'calculator/leagueFixtures', 'calculator/leagueTable', 'calculator/players'],
	function(fixtureGridFormatter, gameWeek, leagueFixtures, leagueTable, players) {

	return {
		fixtureGridFormatter: fixtureGridFormatter,
		gameWeek: gameWeek,
		leagueFixtures: leagueFixtures,
		leagueTable: leagueTable,
		players: players
	};
})