import * as actions from '../constants/actions';

export function setDisplayedDiv(displayClass) {
    return {
        type: actions.SET_DISPLAYED_DIV,
        displayClass
    }
}

export function setLeagueTableSortDirection(direction) {
    return {
        type: actions.SET_LEAGUE_TABLE_SORT_DIRECTION,
        direction
    }
}

export function setLeagueTableSortOption(option) {
    return {
        type: actions.SET_LEAGUE_TABLE_SORT_OPTION,
        option
    }
}

export function clearLeagueSort() {
    return {
        type: actions.CLEAR_LEAGUE_SORT
    }
}

export function setFixtureFilter(value, filter) {
    return {
        type: actions.SET_FIXTURE_FILTER,
        value,
        filter
    }
}

export function clearFixtureFilter() {
    return {
        type: actions.CLEAR_FIXTURE_FILTER
    }
}