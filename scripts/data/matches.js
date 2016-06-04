define([], function() {

    function Match(fixtureID, homeScore, awayScore) {
        var self = this;
        self.fixtureID = fixtureID;
        self.homeScore = homeScore;
        self.awayScore = awayScore;
    }
    // Scores can be one of 0, 1, 2, 3, 4, 5, 6 or W.
    // Games are best of 6.

    var matches = [new Match(1, 3, 3),
        new Match(4, 2, 4),
        new Match(5, 'W', 0),
        new Match(7, 0, 6),
        new Match(10, 5, 1)];

    return matches;
})