define(['calculator/gameWeek', 'calculator/leagueFixtures', 'calculator/leagueTable'],
	function(gameWeek, leagueFixtures, leagueTable) {

	return {
		gameWeek: gameWeek,
		formLeagueFixtures: leagueFixtures,
		formLeagueTable: leagueTable
	};
})