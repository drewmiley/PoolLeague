import calculator from './logic/calculator';
import modify from './logic/modify';

function Sorter(records) {
	let self = this;
	self.records = records;

	self.directions = modify.leagueSort.directions;
	self.options = modify.leagueSort.options;

	self.currentDirection = self.directions[0];
	self.currentOption = self.options[0];

	let previousDirection = self.directions.filter((direction) => { return direction.isDefault; })[0].sort;
	let previousOption = self.options.filter((option) => { return option.isDefault; })[0].sort;

	self.ordered = () => {
		if (self.currentOption == null || self.currentDirection == null) {
			return self.records;
		}

		const sortedArray = modify.util.SortArray(self.records,
			self.currentDirection.sort,
			self.currentOption.sort,
			previousDirection,
			previousOption);

		previousDirection = self.currentDirection.sort;
		previousOption = self.currentOption.sort;

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
