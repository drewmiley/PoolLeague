import * as actionCreators from '../actions/poolLeague';

import '../tags/default/display-title.tag';
import '../tags/default/menu.tag';

import '../tags/fixtureGrid/fixture-grid-div.tag';

import '../tags/leagueFixtures/league-fixtures-div.tag';

import '../tags/leagueTable/league-table-div.tag';

<pool-league>
    <menu store={this.opts.store} setdisplayeddiv={setDisplayedDiv}></menu>
    <display-title store={this.opts.store}></display-title>
    <league-table-div
        store={this.opts.store}
        setleaguetablesortdirection={setLeagueTableSortDirection}
        setleaguetablesortoption={setLeagueTableSortOption}
        clearleaguesort={clearLeagueSort}
        show={state.displayedClass.class === 'leagueTable'}>
    </league-table-div>
    <league-fixtures-div
        store={this.opts.store}
        setfixturefilter={setFixtureFilter}
        clearfixturefilter={clearFixtureFilter}
        show={state.displayedClass.class === 'leagueFixtures'}>
    </league-fixtures-div>
    <fixture-grid-div
        store={this.opts.store}
        show={state.displayedClass.class === 'fixtureGrid'}>
    </fixture-grid-div>

    <script>

        let store = this.opts.store;

        this.state = store.getState();

        store.subscribe(() => {
            this.state = store.getState();
            this.update();
        });

        this.setDisplayedDiv = (displayClass) => {
            store.dispatch(actionCreators.setDisplayedDiv(displayClass));
        };

        this.setLeagueTableSortDirection = (direction) => {
            store.dispatch(actionCreators.setLeagueTableSortDirection(direction));
        };

        this.setLeagueTableSortOption = (option) => {
            store.dispatch(actionCreators.setLeagueTableSortOption(option));
        };

        this.clearLeagueSort = () => {
            store.dispatch(actionCreators.clearLeagueSort());
        };

        this.setFixtureFilter = (value, filter) => {
            store.dispatch(actionCreators.setFixtureFilter(value, filter));
        };

        this.clearFixtureFilter = () => {
            store.dispatch(actionCreators.clearFixtureFilter());
        };

    </script>

</pool-league>
