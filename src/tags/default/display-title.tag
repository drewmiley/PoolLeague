<display-title>

    <div class='col-md-10 col-sm-12'>
        <p class = 'h3'>{state.displayedClass.text}</span></p>
    </div>

    <script>

        let store = this.opts.store;

        this.state = store.getState();

        store.subscribe(function () {
            this.state = store.getState();
            this.update();
        }.bind(this));

    </script>

</display-title>