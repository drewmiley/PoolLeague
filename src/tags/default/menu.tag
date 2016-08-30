<menu>

    <div id='menu' class='btn-group col-sm-6' role='group'>
        <button class='btn btn-default {btn-primary: class === state.displayedClass.class}' each={state.displayClasses} type='button' onclick={setDisplayedDiv}>
            {text}
        </button>
    </div>

    <script>

        let store = this.opts.store;

        this.state = store.getState();

        store.subscribe(() => {
            this.state = store.getState();
            this.update();
        });

        this.setDisplayedDiv = (e) => {
            this.opts.setdisplayeddiv(e.item);
        };
    </script>

</menu>