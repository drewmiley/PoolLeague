import fixtures from '../data/fixtures';
import matches from '../data/matches';
import players from '../data/players';

function PlayerScore(playerID, score) {
	var self = this;
	self.playerID = playerID;
	self.score = score;
}

function formAllPlayerScores(matches, fixtures) {
	var allPlayerScores = [];
	for (var i = 0; i < matches.length; i++) {
		var match = matches[i];
		var correspondingFixture = fixtures.filter(function(fixture) { return fixture.id === match.fixtureID; })[0];
		allPlayerScores.push(new PlayerScore(correspondingFixture.homePlayerID, match.homeScore));
		allPlayerScores.push(new PlayerScore(correspondingFixture.awayPlayerID, match.awayScore));
	}
	return allPlayerScores;
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

function formLeagueTableRow(player, allPlayerScores) {
	var playerScores = allPlayerScores.filter(function(playerScore) { return playerScore.playerID === player.id; })
		.map(function(playerScore) { return playerScore.score; });
	return calculateLeagueTableRow(player.name, playerScores);
}

export default function formLeagueTable() {
	var allPlayerScores = formAllPlayerScores(matches, fixtures);
	var leagueTableRows = [];
	for (var i = 0; i < players.length; i++) {
		leagueTableRows.push(formLeagueTableRow(players[i], allPlayerScores));
	}
	return leagueTableRows;
}