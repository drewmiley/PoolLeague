import util from '../modify/util';

import fixtures from '../data/fixtures';
import matches from '../data/matches';
import players from '../data/players';

function LeagueFixture(gameWeek, homePlayer, homeScore, awayPlayer, awayScore) {
	let self = this;
	self.gameWeek = gameWeek;
	self.homePlayer = homePlayer;
	self.homeScore = homeScore;
	self.awayPlayer = awayPlayer;
	self.awayScore = awayScore;
}

export default function formLeagueFixtures() {
	let leagueFixtures = [];

	for (var i = 0; i < fixtures.length; i++) {
		var homeScore = null;
		var awayScore = null;
		for (var j = 0; j < matches.length; j++) {
			var matchArray = matches.filter((match) => { return match.fixtureID === fixtures[i].id; });
			if (matchArray.length === 1) {
				homeScore = matchArray[0].homeScore;
				awayScore = matchArray[0].awayScore;
			}
		}
		leagueFixtures.push(new LeagueFixture(fixtures[i].gameWeek,
			players.filter((player) => { return player.id === fixtures[i].homePlayerID; })[0].name, homeScore,
			players.filter((player) => { return player.id === fixtures[i].awayPlayerID; })[0].name, awayScore));
	}
	return leagueFixtures;
}