import gameWeek from '../calculator/gameWeek';

import {NumberOfFramesInMatch} from '../data/config';
import fixtures from '../data/fixtures';
import gameWeekDates from '../data/gameWeekDates';

import util from './util';

function SelectOption(name, value, isDefault) {
	return {
		name,
		value,
		isDefault
	}
}

function TextFilter(name, initial, accessor) {
	return {
		type: 'text',
		name,
		currentText: initial,
		accessor
	}
}

function SelectFilter(name, options, accessor) {
	return {
		type: 'select',
		name,
		options,
		currentOption: options.filter((option) => { return option.isDefault; })[0],
		accessor
	}
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

const numberGameWeekOptions = possibleGameWeeks.map((value) => { return new SelectOption(util.DateFormatter(value - 1, gameWeekDates), value); });

const gameWeekOptions = [new SelectOption('All', null, true)].concat(tenseGameWeekOptions, numberGameWeekOptions);

const gameStatusOptions = [new SelectOption('All', null, true),
	new SelectOption('Played', NumberOfFramesInMatch),
	new SelectOption('Walkover', ['W0', '0W']),
	new SelectOption('Unplayed', 0)];

const filters = [new TextFilter('Player', '', (record) => { return record.homePlayer + ' ' + record.awayPlayer; }),
	new SelectFilter('Date', gameWeekOptions, (record) => { return record.gameWeek; }),
	new SelectFilter('Status', gameStatusOptions, (record) => { return record.homeScore + record.awayScore; })];

export default {
	options: filters
};