import riot from 'riot';
import {compose, createStore} from 'redux';

import ViewModel from './viewModel';

import * as actions from './constants/actions';

import './tags/pool-league.tag';

import reducer from './reducers/poolLeague';

const viewModel = new ViewModel();

const createStoreDevTools = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = createStoreDevTools(reducer);

store.dispatch({
    type: actions.SET_STATE,
    state: viewModel
});

document.addEventListener('DOMContentLoaded', () => {
    riot.mount('pool-league', {store})
});
