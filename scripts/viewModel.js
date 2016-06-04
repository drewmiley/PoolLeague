define(['ko', 'util', 'calculator', 'data/sort'],
	function(ko, util, calculator, sort) {

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

		self.orderedRows = ko.computed(function() {
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

	var ViewModel = function() {
	    var self = this;

	    var leagueTableRows = calculator.formLeagueTable();
	    self.leagueTableRows = ko.observableArray(leagueTableRows);

		self.leagueTableSorter = new Sorter(self.leagueTableRows);

		var leagueFixtures = calculator.formLeagueFixtures();
		self.leagueFixtures = ko.observable(leagueFixtures);
	}
     
    return ViewModel;
});