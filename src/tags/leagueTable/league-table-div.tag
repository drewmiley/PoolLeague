import './league-table.tag';
import './league-table-sorter.tag';

<league-table-div>

    <div id='leagueTable' class='col-md-10 col-sm-12'>
        <league-table-sorter
            store={this.opts.store}
            label='Sort By:'
            value={state.leagueTableSorter.currentOption.name}
            options={state.leagueTableSorter.options}
            sorter={opts.setleaguetablesortoption}>
        </league-table-sorter>
        <league-table-sorter
            store={this.opts.store}
            label='Direction:'
            value={state.leagueTableSorter.currentDirection.name}
            options={state.leagueTableSorter.directions}
            sorter={opts.setleaguetablesortdirection}>
        </league-table-sorter>
        <button class='btn btn-default' type='button' onclick={clearleaguesort}>Clear Sort</button>
        <league-table store={this.opts.store}></league-table>
    </div>

    <script>

        let store = this.opts.store;

        this.state = store.getState();

        store.subscribe(() => {
            this.state = store.getState();
            this.update();
        });

        this.setleaguetablesortdirection = (direction) => {
            this.opts.setleaguetablesortdirection(direction);
        };

        this.setleaguetablesortoption = (option) => {
            this.opts.setleaguetablesortoption(option);
        };

        this.clearleaguesort = () => {
            this.opts.clearleaguesort();
        };

    </script>

</league-table-div>