define(['ko', 'util', 'calculator', 'data/filter', 'data/sort'],
	function(ko, util, calculator, filter, sort) {

	function Sorter(records) {
		var self = this;
		self.records = records;

		self.options = ko.observableArray(sort.options);
		self.directions = ko.observableArray(sort.directions);

		self.currentOption = ko.observable(self.options()[0]);
		self.currentDirection = ko.observable(self.directions()[0]);

		var previousDirection = sort.directions.filter(function(direction) { return direction.isDefault; })[0].sort;
		var previousOption = sort.options.filter(function(option) { return option.isDefault; })[0].sort;

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

		self.filters = ko.observableArray(filter.options);

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

	    self.gameWeek = ko.observable(calculator.gameWeek);

	    var leagueTableRows = calculator.formLeagueTable();
	    self.leagueTableRows = ko.observableArray(leagueTableRows);

		self.leagueTableSorter = new Sorter(self.leagueTableRows);

		var leagueFixtures = calculator.formLeagueFixtures();
		self.leagueFixtures = ko.observableArray(leagueFixtures);

		self.leagueFixturesFilter = new Filter(self.leagueFixtures);
	}
     
    return ViewModel;
});