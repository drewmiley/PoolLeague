import * as actions from '../constants/actions';

function setState(state, updatedState) {
    let newState = state;
    if (!updatedState) {
        return newState;
    }
    newState = updatedState;
    return newState;
}

function setDisplayedDiv(state, displayClass) {
    let newState = state;
    if (!displayClass) {
        return newState;
    }
    newState.displayedClass = displayClass;
    return newState;
}

function setLeagueTableSortDirection(state, direction) {
    let newState = state;
    if (!direction) {
        return newState;
    }
    newState.leagueTableSorter.currentDirection = newState.leagueTableSorter.directions.filter((item) => {
        return item.value === direction;
    })[0];
    return newState;
}

function setLeagueTableSortOption(state, option) {
    let newState = state;
    if (!option) {
        return newState;
    }
    newState.leagueTableSorter.currentOption = newState.leagueTableSorter.options.filter((item) => {
        return item.value === option;
    })[0];
    return newState;
}

function clearLeagueSort(state) {
    let newState = state;

    newState.leagueTableSorter.currentDirection = newState.leagueTableSorter.directions.filter((direction) => { return direction.isDefault; })[0];
    newState.leagueTableSorter.currentOption = newState.leagueTableSorter.options.filter((option) => { return option.isPrimary; })[0];

    newState.leagueTableSorter.previousDirection = newState.leagueTableSorter.directions.filter((direction) => { return direction.isDefault; })[0];
    newState.leagueTableSorter.previousOption = newState.leagueTableSorter.options.filter((option) => { return option.isSecondary; })[0];

    return newState;
}

function setFixtureFilter(state, value, filter) {
    let newState = state;

    if (!filter || value === null || value === undefined) {
        return newState;
    }
    if (filter.type === 'select') {
        const selectFilter = newState.leagueFixturesFilter.filters.filter((item) => {
            return item == filter;
        })[0];
        selectFilter.currentOption = selectFilter.options.filter((item) => {
            return item.name == value;
        })[0];
    } else if (filter.type === 'text') {
        newState.leagueFixturesFilter.filters.filter((item) => {
            return item == filter;
        })[0].currentText = value;
    }
    return newState;
}

function clearFixtureFilter(state) {
    let newState = state;
    
    newState.leagueFixturesFilter.filters.forEach((filter) => {
        if (filter.type === 'select') {
            filter.currentOption = filter.options.filter((option) => { return option.isDefault; })[0];
        } else if (filter.type === 'text') {
            filter.currentText = '';
        }
    });

    return newState;
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