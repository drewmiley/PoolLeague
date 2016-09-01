<league-fixtures>

    <table class='table'>
        <thead class='thead-default'>
            <tr>
                <th>Date</th>
                <th>Home</th>
                <th></th>
                <th>V</th>
                <th></th>
                <th>Away</th>
            </tr>
        </thead>
        <tbody>
            <tr class='{current: gameWeek === state.gameWeek} {overdue: gameWeek < state.gameWeek && !homeScore && !awayScore}' each={state.leagueFixturesFilter.filtered()}>
                <td>{date}</td>
                <td>{homePlayer}</td>
                <td>{homeScore}</td>
                <td>V</td>
                <td>{awayScore}</td>
                <td>{awayPlayer}</td>
            </tr>    
        </tbody>
    </table>

    <script>

        let store = this.opts.store;

        this.state = store.getState();

        store.subscribe(() => {
            this.state = store.getState();
            this.update();
        });

    </script>

</league-fixtures>