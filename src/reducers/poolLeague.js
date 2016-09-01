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

function clearLeagueSort(state) {
    state.leagueTableSorter.currentDirection = state.leagueTableSorter.directions.filter((direction) => { return direction.isDefault; })[0];
    state.leagueTableSorter.currentOption = state.leagueTableSorter.options.filter((option) => { return option.isPrimary; })[0];

    state.leagueTableSorter.previousDirection = state.leagueTableSorter.directions.filter((direction) => { return direction.isDefault; })[0];
    state.leagueTableSorter.previousOption = state.leagueTableSorter.options.filter((option) => { return option.isSecondary; })[0];

    return state;
}

function setFixtureFilter(state, value, filter) {
    if (!filter || value === null || value === undefined) {
        return state;
    }
    if (filter.type === 'select') {
        const selectFilter = state.leagueFixturesFilter.filters.filter((item) => {
            return item == filter;
        })[0];
        selectFilter.currentOption = selectFilter.options.filter((item) => {
            return item.name == value;
        })[0];
    } else if (filter.type === 'text') {
        state.leagueFixturesFilter.filters.filter((item) => {
            return item == filter;
        })[0].currentText = value;
    }
    return state;
}

function clearFixtureFilter(state) {
    state.leagueFixturesFilter.filters.forEach((filter) => {
        if (filter.type === 'select') {
            filter.currentOption = filter.options.filter((option) => { return option.isDefault; })[0];
        } else if (filter.type === 'text') {
            filter.currentText = '';
        }
    });

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
        case actions.CLEAR_LEAGUE_SORT:
            return clearLeagueSort(state);
        case actions.SET_FIXTURE_FILTER:
            return setFixtureFilter(state, action.value, action.filter);
        case actions.CLEAR_FIXTURE_FILTER:
            return clearFixtureFilter(state);
        default:
            return state;
    }
    return state;
}