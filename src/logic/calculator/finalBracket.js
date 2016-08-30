import finals from '../data/finals';

function BracketMatch(matchID, playersInRound, homePlayer, homeScore, awayPlayer, awayScore) {
    var self = this;
    self.matchID = matchID;
    self.playersInRound = playersInRound;
    self.homePlayer = homePlayer;
    self.homeScore = homeScore;
    self.awayPlayer = awayPlayer;
    self.awayScore = awayScore;
}

export default function formFinalBracket(sortedLeagueTable) {
    let thing = [];
    for (var i = 0; i < 4; i++) {
        thing.push(sortedLeagueTable[finals.playerLayout[i] - 1].name);
    }
    console.log(finals);
    console.log(sortedLeagueTable);
    return thing;
}