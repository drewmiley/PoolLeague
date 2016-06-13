define(['ko', 'data/fixtures', 'data/gameWeek'],
	function(ko, fixtures, gameWeek) {

	function SelectOption(name, value, isDefault) {
		var self = this;
		self.Name = name;
		self.Value = value;
		self.IsDefault = isDefault;
	}

	function TextFilter(name, accessor, initial) {
		var self = this;
		self.Type = 'text';
		self.Name = name;
		self.CurrentText = initial ? ko.observable(initial) : ko.observable('');
		self.Accessor = accessor;
	}

	function SelectFilter(name, options, accessor) {
		var self = this;
		self.Type = 'select';
		self.Name = name;
		self.Options = options;
		self.CurrentOption = ko.observable(options.filter(function(option) { return option.IsDefault; })[0]);
		self.Accessor = accessor;
	}

	var possibleGameWeeks = fixtures.map(function(fixture) { return fixture.gameWeek; })
		.filter(function(elem, index, self) {
    		return index === self.indexOf(elem);
		}).sort(function(a, b){
			return a - b;
		});

	var tenseGameWeekOptions = [new SelectOption("Current", gameWeek),
		new SelectOption("Future", possibleGameWeeks.filter(function(value) { return value > gameWeek; })),
		new SelectOption("Past", possibleGameWeeks.filter(function(value) { return value < gameWeek; }))];

	var numberGameWeekOptions = possibleGameWeeks.map(function(value) { return new SelectOption(value, value); });

	var gameWeekOptions = [new SelectOption("All", null, true)].concat(tenseGameWeekOptions, numberGameWeekOptions);

	var gameStatusOptions = [new SelectOption("All", null, true),
		new SelectOption("Played", 6),
		new SelectOption("Walkover", ["W0", "0W"]),
		new SelectOption("Unplayed", 0)];

	var filters = [new TextFilter("Player", function(record) { return record.homePlayer + ' ' + record.awayPlayer; }),
		new SelectFilter("Game Week", gameWeekOptions, function(record) { return record.gameWeek; }),
		new SelectFilter("Game Status", gameStatusOptions, function(record) { return record.homeScore + record.awayScore; })];

	return {
		options: filters
	};
})