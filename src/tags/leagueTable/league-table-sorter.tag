<league-table-sorter>

    <div class='panel panel-default'>
        <div class='panel-heading'>{opts.label}</div>
        <select class='form-control' value={opts.value} onchange={sorter}>
            <option each={opts.options}>{name}</option>
        </select>
    </div>

    <script>

        let store = this.opts.store;

        this.state = store.getState();

        store.subscribe(() => {
            this.state = store.getState();
            this.update();
        });

        this.sorter = (e) => {
            this.opts.sorter(e.target.value);
        };

    </script>

</league-table-sorter>