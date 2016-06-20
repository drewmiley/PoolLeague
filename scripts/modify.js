define(['modify/fixtureFilter', 'modify/fixtureGridFormatter', 'modify/leagueSort', 'modify/util'],
    function(fixtureFilter, fixtureGridFormatter, leagueSort, util) {

    return {
        fixtureFilter: fixtureFilter,
        fixtureGridFormatter: fixtureGridFormatter,
        leagueSort: leagueSort,
        util: util
    };
})