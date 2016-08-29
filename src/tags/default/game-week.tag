<game-week>

    <div id='gameWeek' class='col-md-10 col-sm-12'>
        <p class = 'h3'>Current Game Week: {state.gameWeek}</p>
    </div>

    <script>

        let store = this.opts.store;

        this.state = store.getState();

        store.subscribe(() => {
            this.state = store.getState();
            this.update();
        });

    </script>

</game-week>