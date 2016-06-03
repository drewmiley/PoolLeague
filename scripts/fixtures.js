define([], function() {

    function Fixture(id, gameWeek, homePlayerId, awayPlayerId) {
        var self = this;
        self.id = id;
        self.gameWeek = gameWeek;
        self.homePlayerId = homePlayerId;
        self.awayPlayerId = awayPlayerId;
    }

    var fixtures = [new Fixture(1, 1, 1, 2),
        new Fixture(2, 1, 3, 4),
        new Fixture(3, 2, 5, 1),
        new Fixture(4, 2, 4, 2),
        new Fixture(5, 3, 5, 3),
        new Fixture(6, 3, 1, 4),
        new Fixture(7, 4, 3, 1),
        new Fixture(8, 4, 2, 5),
        new Fixture(9, 5, 2, 3),
        new Fixture(10, 5, 4, 5)];

    return fixtures;
})