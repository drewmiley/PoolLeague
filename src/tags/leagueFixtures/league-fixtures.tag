<league-fixtures>

    <table class='table table-striped'>
        <thead class='thead-default'>
            <tr>
                <th>Week</th>
                <th>Home</th>
                <th></th>
                <th>V</th>
                <th></th>
                <th>Away</th>
            </tr>
        </thead>
        <tbody each={state.leagueFixturesFilter.filtered()}>
            <tr>
                <td>{gameWeek}</td>
                <td>{homePlayer}</td>
                <td>{homeScore}</td>
                <td>V</td>
                <td>{awayPlayer}</td>
                <td>{awayScore}</td>
            </tr>    
        </tbody>
    </table>

    <script>

        let store = this.opts.store;

        this.state = store.getState();

        store.subscribe(function () {
            this.state = store.getState();
            this.update();
        }.bind(this));

    </script>

</league-fixtures>