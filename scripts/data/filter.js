define(['ko'], function(ko) {

	function GetOption(name, value, filterValue) {
		var option = {
			Name: name,
			Value: value,
			FilterValue: filterValue
		};
		return option;
	}

	// function TextFilter(type, name, value, filter) {
	// 	var self = this;
	// 	self.type = 'text';
	// 	self.name = name;
	// 	self.value = value;
	// 	self.filter = filter;
	// }

	// function FilterOption(name, value, filter) {
	// 	var self = this;
	// 	self.name = name;
	// 	self.value = value;
	// 	self.filter = filter;
	// }

	// var filters = [{
	// 	Type: "text",
	// 	Name: "Home Player",
	// 	CurrentText: ko.observable(""),
	// 	RecordValue: function(record) { return record.homePlayer; }
	// },
	// {
	// 	Type: "select",
	// 	Name: "Game Week",
	// 	Options: [
	// 		GetOption("All", "All", null),
	// 		GetOption("1", "1", 1),
	// 		GetOption("2", "2", 2),
	// 		GetOption("3", "3", 3)
	// 	],
	// 	CurrentOption: ko.observable(),
	// 	RecordValue: function(record) { return record.gameWeek; }
	// }];

	var filters = [{
		Type: "text",
		Name: "Home Player",
		CurrentText: ko.observable(""),
		RecordValue: function(record) { return record.homePlayer; }
	},
	{
		Type: "select",
		Name: "Game Week",
		Options: [
			GetOption("All", "All", null),
			GetOption("1", "1", 1),
			GetOption("2", "2", 2),
			GetOption("3", "3", 3)
		],
		CurrentOption: ko.observable(),
		RecordValue: function(record) { return record.gameWeek; }
	}];

	return {
		options: filters
	};
})