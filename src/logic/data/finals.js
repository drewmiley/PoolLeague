function KnockoutMatch(matchID, playersInRound, homeScore, awayScore) {
    var self = this;
    self.matchID = matchID;
    self.playersInRound = playersInRound;
    self.homeScore = homeScore;
    self.awayScore = awayScore;
}

const playerLayout = [1, 2, 3, 4];

// Scores can be one of 0, 1, 2, 3, 4 or W.
// Games are first to 4.

const matches = [new KnockoutMatch(1, 4, 4, 0),
    new KnockoutMatch(2, 4, 2, 4),
    new KnockoutMatch(1, 2, 0, 'W')];

export default {
    playerLayout,
    matches
};