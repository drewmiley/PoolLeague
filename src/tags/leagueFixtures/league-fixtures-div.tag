import './league-fixtures.tag';
import './league-fixtures-filter.tag';

<league-fixtures-div>

    <div id='leagueFixtures' class='col-md-10 col-sm-12'>
        <league-fixtures-filter
            store={this.opts.store}
            setfixturefilter={opts.setfixturefilter}>
        </league-fixtures-filter>
        <button class='btn btn-default' type='button' onclick={clearfixturefilter}>Clear Filters</button>
        <league-fixtures store={this.opts.store}></league-fixtures>
    </div>

    <script>

        let store = this.opts.store;

        this.state = store.getState();

        store.subscribe(() => {
            this.state = store.getState();
            this.update();
        });

        this.clearfixturefilter = () => {
            this.opts.clearfixturefilter();
        };

    </script>

</league-fixtures-div>