<league-table>

    <table class='table table-striped'>
        <thead class='thead-default'>
            <tr>
                <th>Name</th>
                <th>P</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>F</th>
                <th>A</th>
                <th>B</th>
                <th>Pts</th>
            </tr>
        </thead>
        <tbody each={state.leagueTableSorter.ordered()}>
            <tr>
                <td>{name}</td>
                <td>{played}</td>
                <td>{won}</td>
                <td>{drew}</td>
                <td>{lost}</td>
                <td>{framesWon}</td>
                <td>{framesLost}</td>
                <td>{bonus}</td>
                <td>{points}</td>
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

</league-table>