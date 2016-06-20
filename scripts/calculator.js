define(['calculator/gameWeek', 'calculator/leagueFixtures', 'calculator/leagueTable', 'calculator/players'],
	function(gameWeek, leagueFixtures, leagueTable, players) {

	return {
		gameWeek: gameWeek,
		leagueFixtures: leagueFixtures,
		leagueTable: leagueTable,
		players: players
	};
})