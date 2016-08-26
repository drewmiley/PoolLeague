<league-table-option-sorter>

    <div class="panel panel-default">
        <div class="panel-heading">Sort By:</div>
        <select class="form-control" value={state.leagueTableSorter.currentOption.name} onchange={setLeagueTableSortOption}>
            <option each={state.leagueTableSorter.options}>{name}</option>
        </select>
    </div>

    <script>

        let store = this.opts.store;

        this.state = store.getState();

        store.subscribe(function () {
            this.state = store.getState();
            this.update();
        }.bind(this));

        this.setLeagueTableSortOption = (e) => {
            this.opts.setleaguetablesortoption(e.target.value);
        };

    </script>

</league-table-option-sorter>