import './league-table.tag';
import './league-table-sorter.tag';

<league-table-div>

    <div id='leagueTable' class='col-md-10 col-sm-12'>
        <league-table-sorter
            store={this.opts.store}
            setleaguetablesortdirection={opts.setleaguetablesortdirection}
            setleaguetablesortoption={opts.setleaguetablesortoption}>
        </league-table-sorter>
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

    </script>

</league-table-div>