import './league-table-direction-sorter.tag';
import './league-table-option-sorter.tag';

<league-table-sorter>

    <league-table-option-sorter store={this.opts.store}></league-table-option-sorter>
    <league-table-direction-sorter
        store={this.opts.store}
        setleaguetablesortdirection={opts.setleaguetablesortdirection}>
    </league-table-direction-sorter>

    <script>

        let store = this.opts.store;

        this.state = store.getState();

        store.subscribe(function () {
            this.state = store.getState();
            this.update();
        }.bind(this));

        this.setleaguetablesortdirection = (direction) => {
            this.opts.setleaguetablesortdirection(direction);
        };

    </script>

</league-table-sorter>