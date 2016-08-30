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
	const numberOfWalkovers = played - numericScores.length;

	const won = numberOfWalkovers + numericScores.filter((score) => { return score > 3; }).length;
	const drew = numericScores.filter((score) => { return score === 3; }).length;
	const lost = numericScores.filter((score) => { return score < 3; }).length;

	const pointsFor = 6 * numberOfWalkovers + numericScores.reduce((a, b) => { return a + b; }, 0);
	const pointsAgainst = 6 * played - 6 * numberOfWalkovers - numericScores.reduce((a, b) => { return a + b; }, 0);

	const pointsDifference = pointsFor - pointsAgainst;

	const bonus = numericScores.filter((score) => { return score === 6; }).length;

	const points = 3 * won + drew + pointsFor + bonus;

	return new LeagueTableRow(name, played, won, drew, lost, pointsFor, pointsAgainst, pointsDifference, bonus, points);
}

function formLeagueTableRow(player, allPlayerScores) {
	const playerScores = allPlayerScores.filter((playerScore) => { return playerScore.playerID === player.id; })
		.map((playerScore) => { return playerScore.score; });
	return calculateLeagueTableRow(player.name, playerScores);
}

export default function formLeagueTable() {
	const allPlayerScores = formAllPlayerScores(matches, fixtures);
	let leagueTableRows = [];
	for (var i = 0; i < players.length; i++) {
		leagueTableRows.push(formLeagueTableRow(players[i], allPlayerScores));
	}
	return leagueTableRows;
}