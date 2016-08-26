import calculator from './logic/calculator';
import modify from './logic/modify';

var util = modify.util;

function Sorter(records) {
	var self = this;
	self.records = records;

	var leagueSort = modify.leagueSort;

	self.options = leagueSort.options;
	self.directions = leagueSort.directions;

	self.currentOption = self.options[0];
	self.currentDirection = self.directions[0];

	var previousDirection = leagueSort.directions.filter(function(direction) { return direction.isDefault; })[0].sort;
	var previousOption = leagueSort.options.filter(function(option) { return option.isDefault; })[0].sort;

	self.ordered = function() {
		var records = self.records;
		var sortOption = self.currentOption;
		var sortDirection = self.currentDirection;

		if (sortOption == null || sortDirection == null) {
			return records;
		}

		var sortedArray = util.SortArray(records,
			sortDirection.sort,
			sortOption.sort,
			previousDirection,
			previousOption);

		previousDirection = sortDirection.sort;
		previousOption = sortOption.sort;

		return sortedArray;
	};
}

function Filter(records) {
	var self = this;
	self.records = records;

	var fixtureFilter = modify.fixtureFilter;

	self.filters = fixtureFilter.options;

	self.activeFilters = function() {
		var filters = self.filters;
		var activeFilters = [];

		return filters.filter(function(filter) { return (filter.Type === 'select' && filter.CurrentOption.Value != null) ||
				(filter.Type === 'text' && filter.CurrentText);});
	};

	self.filtered = function() {
		var records = self.records;
		var activeFilters = self.activeFilters();

		return records.filter(function(record) { return !util.IsFiltered(record, activeFilters); });
	};
}

export default function ViewModel() {
    var self = this;

    self.gameWeek = calculator.gameWeek;

    var leagueTable = calculator.leagueTable();
    self.leagueTable = leagueTable;

	self.leagueTableSorter = new Sorter(self.leagueTable);

	var leagueFixtures = calculator.leagueFixtures();
	self.leagueFixtures = leagueFixtures;

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
