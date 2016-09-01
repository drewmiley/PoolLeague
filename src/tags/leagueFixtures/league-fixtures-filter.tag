<league-fixtures-filter>

    <div each={state.leagueFixturesFilter.filters}>
        <div class='panel panel-default'>
            <div class='panel-heading'>{name}:</div>
            <div if={type === 'select'}>
                <select class='form-control' value={currentOption.name} onchange={setFixtureFilter}>
                    <option each={options}>{name}</option>
                </select>
            </div>
            <div if={type === 'text'}>
                <input class='form-control' value={currentText} onkeyup={setFixtureFilter} />
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