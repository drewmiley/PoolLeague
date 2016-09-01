import {NumberOfFramesGivenForWalkover, NumberOfFramesInMatch, TotalPoints} from '../data/config';
import fixtures from '../data/fixtures';
import matches from '../data/matches';
import players from '../data/players';

function PlayerScore(playerID, score) {
	let self = this;
	self.playerID = playerID;
	self.score = score;
}

function formAllPlayerScores(matches, fixtures) {
	let allPlayerScores = [];
	for (var i = 0; i < matches.length; i++) {
		var match = matches[i];
		var correspondingFixture = fixtures.filter((fixture) => { return fixture.id === match.fixtureID; })[0];
		allPlayerScores.push(new PlayerScore(correspondingFixture.homePlayerID, match.homeScore));
		allPlayerScores.push(new PlayerScore(correspondingFixture.awayPlayerID, match.awayScore));
	}
	return allPlayerScores;
}

function LeagueTableRow(name, played, won, drew, lost, framesWon, framesLost, frameDifference, bonus, points) {
	let self = this;
	self.name = name;
	self.played = played;
	self.won = won;
	self.drew = drew;
	self.lost = lost;
	self.framesWon = framesWon;
	self.framesLost = framesLost;
	self.frameDifference = frameDifference;
	self.bonus = bonus;
	self.points = points;
}

function calculateLeagueTableRow(name, scores) {
	const played = scores.length;

	const numericScores = scores.filter((score) => { return !isNaN(parseFloat(score)); });
	const numberOfWalkoversGiven = played - numericScores.length;

	const won = numberOfWalkoversGiven + numericScores.filter((score) => { return score > NumberOfFramesInMatch / 2; }).length;
	const drew = numericScores.filter((score) => { return score === NumberOfFramesInMatch / 2; }).length;
	const lost = numericScores.filter((score) => { return score < NumberOfFramesInMatch / 2; }).length;

	const pointsFor = NumberOfFramesGivenForWalkover * numberOfWalkoversGiven + numericScores.reduce((a, b) => { return a + b; }, 0);
	const pointsAgainst = NumberOfFramesInMatch * numericScores.length - numericScores.reduce((a, b) => { return a + b; }, 0);

	const pointsDifference = pointsFor - pointsAgainst;

	const bonus = numericScores.filter((score) => { return score === NumberOfFramesInMatch; }).length;

	const points = TotalPoints(played, won, drew, lost, pointsFor, pointsAgainst, bonus);

	return new LeagueTableRow(name, played, won, drew, lost, pointsFor, pointsAgainst, pointsDifference, bonus, points);
}

function formLeagueTableRow(player, allPlayerScores) {
	const playerScores = allPlayerScores.filter((playerScore) => { return playerScore.playerID === player.id; })
		.map((playerScore) => { return playerScore.score; });
	return calculateLeagueTableRow(player.name, playerScores);
}

const leagueTable = (() => {
	const allPlayerScores = formAllPlayerScores(matches, fixtures);
	let leagueTableRows = [];
	for (var i = 0; i < players.length; i++) {
		leagueTableRows.push(formLeagueTableRow(players[i], allPlayerScores));
	}
	return leagueTableRows;
})();

export default leagueTable;