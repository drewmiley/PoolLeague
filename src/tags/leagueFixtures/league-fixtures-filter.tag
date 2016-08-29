<league-fixtures-filter>

    <div each={state.leagueFixturesFilter.filters}>
        <div class='panel panel-default'>
            <div class='panel-heading'>{Name}:</div>
            <div if={Type === 'select'}>
                <select class='form-control' value={CurrentOption.Name} onchange={setFixtureFilter}>
                    <option each={Options}>{Name}</option>
                </select>
            </div>
            <div if={Type === 'text'}>
                <input class='form-control' value={CurrentText} onkeyup={setFixtureFilter} />
            </div>
        </div>
    </div>

    <script>

        let store = this.opts.store;

        this.state = store.getState();

        store.subscribe(() => {
            this.state = store.getState();
            this.update();
        });

        this.setFixtureFilter = (e) => {
            this.opts.setfixturefilter(e.target.value, e.item);
        };

    </script>

</league-fixtures-filter>