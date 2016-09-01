import gameWeek from './calculator/gameWeek';
import leagueFixtures from './calculator/leagueFixtures';
import leagueTable from './calculator/leagueTable';

import players from './data/players';

import fixtureFilter from './modify/fixtureFilter';
import fixtureGridFormatter from './modify/fixtureGridFormatter';
import leagueSort from './modify/leagueSort';
import util from './modify/util';

function Sorter(records) {
	let self = this;
	self.records = records;

	self.directions = leagueSort.directions;
	self.options = leagueSort.options;

	self.currentDirection = self.directions.filter((direction) => { return direction.isPrimary; })[0];
	self.currentOption = self.options.filter((option) => { return option.isPrimary; })[0];

	self.previousDirection = self.directions.filter((direction) => { return direction.isPrimary; })[0];
	self.previousOption = self.options.filter((option) => { return option.isSecondary; })[0];

	self.ordered = () => {
		if (self.currentOption == null || self.currentDirection == null) {
			return self.records;
		}

		const sortedArray = util.SortArray(self.records,
			self.currentDirection.sort,
			self.currentOption.sort,
			self.previousDirection.sort,
			self.previousOption.sort);

		self.previousDirection = self.currentDirection;
		self.previousOption = self.currentOption;

		return sortedArray;
	};
}

function Filter(records) {
	let self = this;
	self.records = records;

	self.filters = fixtureFilter.options;

	self.activeFilters = () => {
		return self.filters.filter((filter) => { return (filter.Type === 'select' && filter.CurrentOption.Value != null) ||
				(filter.Type === 'text' && filter.CurrentText);});
	};

	self.filtered = () => {
		return self.records.filter((record) => { return !util.IsFiltered(record, self.activeFilters()); });
	};
}

export default function ViewModel() {
    let self = this;

	self.players = players;

    self.gameWeek = gameWeek;

	self.leagueTableSorter = new Sorter(leagueTable);

	self.leagueFixturesFilter = new Filter(leagueFixtures);

	self.fixtureGridFormatter = fixtureGridFormatter;

	self.displayClasses = [{
		class: 'leagueTable',
		text: 'League Table'
	},{
		class: 'leagueFixtures',
		text: 'Fixture List'
	},{
		class: 'fixtureGrid',
		text: 'Fixture Grid'
	}];

	self.displayedClass = self.displayClasses[0];
}
