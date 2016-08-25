<league-table-option-sorter>

    <div class="panel panel-default">
        <div class="panel-heading">Sort By:</div>
        <select class="form-control" value={state.leagueTableSorter.currentOption.name}>
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

    </script>

</league-table-option-sorter>