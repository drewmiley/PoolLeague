define(['ko', 'util', 'calculator', 'data/filter', 'data/sort'],
	function(ko, util, calculator, filter, sort) {

	function Sorter(tableRows) {
		var self = this;
		self.tableRows = tableRows;

		self.options = ko.observableArray(sort.options);
		self.directions = ko.observableArray(sort.directions);

		self.currentOption = ko.observable(self.options()[0]);
		self.currentDirection = ko.observable(self.directions()[0]);

		var previousDirection = true;
		var previousOption = function(left, right) {
			if (left.name.toLowerCase() < right.name.toLowerCase()) {
				return 1;
			} else if (left.name.toLowerCase() > right.name.toLowerCase()) {
				return -1;
			} else {
				return 0;
			}
		};

		self.ordered = ko.computed(function() {
			var tableRows = self.tableRows();
			var sortOption = self.currentOption();
			var sortDirection = self.currentDirection();

			if (sortOption == null || sortDirection == null) {
				return tableRows;
			}

			var sortedArray = util.SortArray(tableRows,
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
			for (var index = 0; index < filters.length; index++) {
				var filter = filters[index];
				if (filter.CurrentOption) {
					var filterOption = filter.CurrentOption();
					if (filterOption && filterOption.FilterValue != null) {
						var activeFilter = {
							Filter: filter,
							IsFiltered: function(filter, record) {
								var filterOption = filter.CurrentOption();
								if (!filterOption) {
									return;
								}

								var recordValue = filter.RecordValue(record);
								return recordValue != filterOption.FilterValue;NoMat
							}
						};
						activeFilters.push(activeFilter);
					}
				} else if (filter.CurrentText) {
					var filterValue = filter.CurrentText();
					if (filterValue && filterValue != "") {
						var activeFilter = {
							Filter: filter,
							IsFiltered: function(filter, record) {
								var filterValue = filter.CurrentText();
								filterValue = filterValue.toUpperCase();
								
								var recordValue = filter.RecordValue(record);
								recordValue = recordValue.toUpperCase();
								return recordValue.indexOf(filterValue) == -1;
							}
						};
						activeFilters.push(activeFilter);
					}
				}
			}

			return activeFilters;
		});
		self.filtered = ko.computed(function() {
			var records = self.records();
			var filters = self.activeFilters();
			if (filters.length == 0) {
				return records;
			}
			
			var filteredRecords = [];
			for (var rIndex = 0; rIndex < records.length; rIndex++) {
				var isIncluded = true;
				var record = records[rIndex];
				for (var fIndex = 0; fIndex < filters.length; fIndex++) {
					var filter = filters[fIndex];
					var isFiltered = filter.IsFiltered(filter.Filter, record);
					if (isFiltered) {
						isIncluded = false;
						break;
					}
				}
				
				if (isIncluded) {
					filteredRecords.push(record);
				}
			}

			return filteredRecords;
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