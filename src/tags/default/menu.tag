<menu>

    <div id='menu' class='col-sm-6'>
        <ul class='list-group' each={state.displayClasses}>
            <li class='list-group-item {active: class === state.displayedClass.class}' onclick={setDisplayedDiv}>
                <label>{text}</label>
            </li>
        </ul>
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