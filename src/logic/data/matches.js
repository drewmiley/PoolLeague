import {FilterValidMatches} from '../data/config';

function Match(fixtureID, homeScore, awayScore) {
    var self = this;
    self.fixtureID = fixtureID;
    self.homeScore = homeScore;
    self.awayScore = awayScore;
}

const matches = [new Match(1, 3, 3),
    new Match(4, 2, 4),
    new Match(5, 0, 'W'),
    new Match(7, 0, 6),
    new Match(10, 5, 1)];

export default FilterValidMatches(matches);