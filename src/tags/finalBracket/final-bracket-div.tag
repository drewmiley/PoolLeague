<final-bracket-div>

    <div id='finalBracket' class='col-md-10 col-sm-12'>
        <label each={i, thing in state.finalBracket}>{i} + {thing}</label>
    </div>

    <script>

        let store = this.opts.store;

        this.state = store.getState();

        store.subscribe(() => {
            this.state = store.getState();
            this.update();
        });

    </script>

</final-bracket-div>