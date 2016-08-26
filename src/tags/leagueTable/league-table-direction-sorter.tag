<league-table-direction-sorter>

    <div class="panel panel-default">
        <div class="panel-heading">Direction:</div>
        <select class="form-control" value={state.leagueTableSorter.currentDirection.name} onchange={setLeagueTableSortDirection}>
            <option each={state.leagueTableSorter.directions}>{name}</option>
        </select>
    </div>

    <script>

        let store = this.opts.store;

        this.state = store.getState();

        store.subscribe(function () {
            this.state = store.getState();
            this.update();
        }.bind(this));

        this.setLeagueTableSortDirection = (e) => {
            this.opts.setleaguetablesortdirection(e.target.value);
        };

    </script>

</league-table-direction-sorter>