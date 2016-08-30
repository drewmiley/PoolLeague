import calculator from './logic/calculator';
import modify from './logic/modify';

function Sorter(records) {
	let self = this;
	self.records = records;

	self.directions = modify.leagueSort.directions;
	self.options = modify.leagueSort.options;

	self.currentDirection = self.directions.filter((direction) => { return direction.isPrimary; })[0];
	self.currentOption = self.options.filter((option) => { return option.isPrimary; })[0];

	self.previousDirection = self.directions.filter((direction) => { return direction.isPrimary; })[0];
	self.previousOption = self.options.filter((option) => { return option.isSecondary; })[0];

	self.ordered = () => {
		if (self.currentOption == null || self.currentDirection == null) {
			return self.records;
		}

		const sortedArray = modify.util.SortArray(self.records,
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

	self.filters = modify.fixtureFilter.options;

	self.activeFilters = () => {
		return self.filters.filter((filter) => { return (filter.Type === 'select' && filter.CurrentOption.Value != null) ||
				(filter.Type === 'text' && filter.CurrentText);});
	};

	self.filtered = () => {
		return self.records.filter((record) => { return !modify.util.IsFiltered(record, self.activeFilters()); });
	};
}

export default function ViewModel() {
    let self = this;

    self.gameWeek = calculator.gameWeek;

    self.leagueTable = calculator.leagueTable();
	self.leagueTableSorter = new Sorter(self.leagueTable);

	self.leagueFixtures = calculator.leagueFixtures();
	self.leagueFixturesFilter = new Filter(self.leagueFixtures);

	self.players = calculator.players;
	self.fixtureGridFormatter = modify.fixtureGridFormatter;

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
