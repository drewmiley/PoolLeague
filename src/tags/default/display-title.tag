<display-title>

    <div class='col-md-10 col-sm-12'>
        <p class = 'h2'>{state.displayedClass.text}</span></p>
    </div>

    <script>

        let store = this.opts.store;

        this.state = store.getState();

        store.subscribe(() => {
            this.state = store.getState();
            this.update();
        });

    </script>

</display-title>