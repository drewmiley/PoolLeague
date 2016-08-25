import * as actionCreators from '../actions/poolLeague';

import '../tags/display-title.tag';
import '../tags/game-week.tag';
import '../tags/league-table-div.tag';
import '../tags/menu.tag';

<pool-league>
    <menu store={this.opts.store} setdisplayeddiv={setDisplayedDiv}></menu>
    <game-week store={this.opts.store}></game-week>
    <display-title store={this.opts.store}></display-title>
    <league-table-div
        store={this.opts.store}
        setleaguetablesortdirection={setLeagueTableSortDirection}
        show={state.displayedClass.class === 'leagueTable'}>
    </league-table-div>

    <script>
        let store = this.opts.store;

        this.state = store.getState();

        store.subscribe(function () {
            this.state = store.getState();
            this.update();
        }.bind(this));

        this.setLeagueTableSortDirection = (direction) => {
            store.dispatch(actionCreators.setLeagueTableSortDirection(direction));
        };

        this.setDisplayedDiv = (displayClass) => {
            store.dispatch(actionCreators.setDisplayedDiv(displayClass));
        };
    </script>

</pool-league>
