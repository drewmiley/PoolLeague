import * as actions from '../constants/actions';

function setState(state, newState) {
    if (!newState) {
        return state;
    }
    state = newState;
    return state;
}

function setDisplayedDiv(state, displayClass) {
    if (!displayClass) {
        return state;
    }
    state.displayedClass = displayClass;
    return state;
}

function setLeagueTableSortDirection(state, direction) {
    if (!direction) {
        return state;
    }
    state.leagueTableSorter.currentDirection = state.leagueTableSorter.directions.filter((item) => {
        return item.value === direction;
    })[0];
    return state;
}

function setLeagueTableSortOption(state, option) {
    if (!option) {
        return state;
    }
    state.leagueTableSorter.currentOption = state.leagueTableSorter.options.filter((item) => {
        return item.value === option;
    })[0];
    return state;
}

function setFixtureFilter(state, value, filter) {
    if (!filter || value === null || value === undefined) {
        return state;
    }
    if (filter.Type === 'select') {
        const selectFilter = state.leagueFixturesFilter.filters.filter((item) => {
            return item == filter;
        })[0];
        selectFilter.CurrentOption = selectFilter.Options.filter((item) => {
            return item.Name == value;
        })[0];
    } else if (filter.Type === 'text') {
        state.leagueFixturesFilter.filters.filter((item) => {
            return item == filter;
        })[0].CurrentText = value;
    }
    return state;
}

export default function(state = {}, action) {
    switch (action.type) {
        case actions.SET_STATE:
            return setState(state, action.state);
        case actions.SET_DISPLAYED_DIV:
            return setDisplayedDiv(state, action.displayClass);
        case actions.SET_LEAGUE_TABLE_SORT_DIRECTION:
            return setLeagueTableSortDirection(state, action.direction);
        case actions.SET_LEAGUE_TABLE_SORT_OPTION:
            return setLeagueTableSortOption(state, action.option);
        case actions.SET_FIXTURE_FILTER:
            return setFixtureFilter(state, action.value, action.filter);
        default:
            return state;
    }
    return state;
}