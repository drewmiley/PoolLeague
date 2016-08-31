import {NumberOfFramesInMatch} from '../data/config';
import fixtures from '../data/fixtures';
import gameWeek from '../data/gameWeek';

function SelectOption(name, value, isDefault) {
	let self = this;
	self.Name = name;
	self.Value = value;
	self.IsDefault = isDefault;
}

function TextFilter(name, accessor, initial) {
	let self = this;
	self.Type = 'text';
	self.Name = name;
	self.CurrentText = initial;
	self.Accessor = accessor;
}

function SelectFilter(name, options, accessor) {
	let self = this;
	self.Type = 'select';
	self.Name = name;
	self.Options = options;
	self.CurrentOption = options.filter((option) => { return option.IsDefault; })[0];
	self.Accessor = accessor;
}

const possibleGameWeeks = fixtures.map((fixture) => { return fixture.gameWeek; })
	.filter((elem, index, self) => {
		return index === self.indexOf(elem);
	}).sort((a, b) => {
		return a - b;
	});

const tenseGameWeekOptions = [new SelectOption('Current', gameWeek),
	new SelectOption('Future', possibleGameWeeks.filter((value) => { return value > gameWeek; })),
	new SelectOption('Past', possibleGameWeeks.filter((value) => { return value < gameWeek; }))];

const numberGameWeekOptions = possibleGameWeeks.map((value) => { return new SelectOption(value, value); });

const gameWeekOptions = [new SelectOption('All', null, true)].concat(tenseGameWeekOptions, numberGameWeekOptions);

const gameStatusOptions = [new SelectOption('All', null, true),
	new SelectOption('Played', NumberOfFramesInMatch),
	new SelectOption('Walkover', ['W0', '0W']),
	new SelectOption('Unplayed', 0)];

const filters = [new TextFilter('Player', (record) => { return record.homePlayer + ' ' + record.awayPlayer; }, ''),
	new SelectFilter('Game Week', gameWeekOptions, (record) => { return record.gameWeek; }),
	new SelectFilter('Game Status', gameStatusOptions, (record) => { return record.homeScore + record.awayScore; })];

export default {
	options: filters
};