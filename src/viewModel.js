import gameWeek from './calculator/gameWeek';
import leagueFixtures from './calculator/leagueFixtures';
import leagueTable from './calculator/leagueTable';

import players from './data/players';

import fixtureFilter from './modify/fixtureFilter';
import fixtureGridFormatter from './modify/fixtureGridFormatter';
import leagueSort from './modify/leagueSort';
import util from './modify/util';

function Sorter(passedRecords) {
	const records = passedRecords;

	this.directions = leagueSort.directions;
	this.options = leagueSort.options;

	this.currentDirection = this.directions.filter((direction) => { return direction.isDefault; })[0];
	this.currentOption = this.options.filter((option) => { return option.isPrimary; })[0];

	let previousDirection = this.directions.filter((direction) => { return direction.isDefault; })[0];
	let previousOption = this.options.filter((option) => { return option.isSecondary; })[0];

	this.ordered = () => {
		if (this.currentOption == null || this.currentDirection == null) {
			return records;
		}

		const sortedArray = util.SortArray(records,
			this.currentDirection.sort,
			this.currentOption.sort,
			previousDirection.sort,
			previousOption.sort);

		previousDirection = this.currentDirection;
		previousOption = this.currentOption;

		return sortedArray;
	};
}

function Filter(passedRecords) {
	const records = passedRecords;

	this.filters = fixtureFilter.options;

	const activeFilters = () => {
		return this.filters.filter((filter) => { return (filter.type === 'select' && filter.currentOption.value != null) ||
				(filter.type === 'text' && filter.currentText);});
	};

	this.filtered = () => {
		return records.filter((record) => { return !util.IsFiltered(record, activeFilters()); });
	};
}

export default function ViewModel() {
	this.players = players;

    this.gameWeek = gameWeek;

	this.leagueTableSorter = new Sorter(leagueTable);

	this.leagueFixturesFilter = new Filter(leagueFixtures);

	this.fixtureGridFormatter = fixtureGridFormatter;

	this.displayClasses = [{
		class: 'leagueTable',
		text: 'League Table'
	},{
		class: 'leagueFixtures',
		text: 'Fixture List'
	},{
		class: 'fixtureGrid',
		text: 'Fixture Grid'
	}];

	this.displayedClass = this.displayClasses[0];
}
