define(['ko', 'modify/util', 'calculator', 'modify/fixtureFilter', 'modify/leagueSort'],
	function(ko, util, calculator, fixtureFilter, leagueSort) {

	function Sorter(records) {
		var self = this;
		self.records = records;

		self.options = ko.observableArray(leagueSort.options);
		self.directions = ko.observableArray(leagueSort.directions);

		self.currentOption = ko.observable(self.options()[0]);
		self.currentDirection = ko.observable(self.directions()[0]);

		var previousDirection = leagueSort.directions.filter(function(direction) { return direction.isDefault; })[0].sort;
		var previousOption = leagueSort.options.filter(function(option) { return option.isDefault; })[0].sort;

		self.ordered = ko.computed(function() {
			var records = self.records();
			var sortOption = self.currentOption();
			var sortDirection = self.currentDirection();

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
		});
	}

	function Filter(records) {
		var self = this;
		self.records = records;

		self.filters = ko.observableArray(fixtureFilter.options);

		self.activeFilters = ko.computed(function() {
			var filters = self.filters();
			var activeFilters = [];

			return filters.filter(function(filter) { return  (filter.Type === 'select' && filter.CurrentOption().Value != null) ||
					(filter.Type === 'text' && filter.CurrentText() != "");});
		});

		self.filtered = ko.computed(function() {
			var records = self.records();
			var activeFilters = self.activeFilters();

			return records.filter(function(record) { return !util.IsFiltered(record, activeFilters); });
		});
	}

	var ViewModel = function() {
	    var self = this;

	    self.gameWeek = calculator.gameWeek;

	    var leagueTable = calculator.leagueTable();
	    self.leagueTable = ko.observableArray(leagueTable);

		self.leagueTableSorter = new Sorter(self.leagueTable);

		var leagueFixtures = calculator.leagueFixtures();
		self.leagueFixtures = ko.observableArray(leagueFixtures);

		self.leagueFixturesFilter = new Filter(self.leagueFixtures);

		self.players = calculator.players;
		self.fixtureGridFormatter = calculator.fixtureGridFormatter;
	}
     
    return ViewModel;
});