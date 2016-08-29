<fixture-grid-div>

    <div id='fixtureGrid' class='col-md-10 col-sm-12'>
        <table class='table table-striped'>
            <thead class='thead-default'>
                <tr>
                    <th></th>
                    <th each={player, i in state.players}>{player.name}</th>
                </tr>
            </thead>
            <tbody>
                <tr each={player , j in state.players}>
                    <th>{player.name}</th>
                    <td each={player, i in state.players}>{state.fixtureGridFormatter(state.players[j].id, state.players[i].id)}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <script>

        let store = this.opts.store;

        this.state = store.getState();

        store.subscribe(() => {
            this.state = store.getState();
            this.update();
        });

    </script>

</fixture-grid-div>