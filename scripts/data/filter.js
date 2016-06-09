define(['ko'], function(ko) {

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

	var gameWeekOptions = [new SelectOption("All", null, true),
		new SelectOption("1", 1),
		new SelectOption("2", 2),
		new SelectOption("3", 3),
		new SelectOption("4", 4),
		new SelectOption("5", 5)];

	var filters = [new TextFilter("Home Player", function(record) { return record.homePlayer; }),
		new TextFilter("Away Player", function(record) { return record.awayPlayer; }),
		new SelectFilter("Game Week", gameWeekOptions, function(record) { return record.gameWeek; })];

	return {
		options: filters
	};
})