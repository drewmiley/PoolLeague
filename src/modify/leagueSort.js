import {PrimaryLeagueSortOption, SecondaryLeagueSortOption, PrimaryLeagueSortDirection} from '../data/config';

function SortOption(name, value, sort) {
	return {
		name,
		value,
		sort,
		isPrimary: PrimaryLeagueSortOption === value,
		isSecondary: SecondaryLeagueSortOption === value
	}
}

function SortDirection(name, value, sort) {
	return {
		name,
		value,
		sort,
		isDefault: sort
	}
}

const sortDirections = [new SortDirection('Asc', 'Asc', true),
	new SortDirection('Desc', 'Desc', false)];

const sortOptions = [new SortOption('Pts', 'Pts', (left, right) => {
		return left.points - right.points;
	}),
	new SortOption('Name', 'Name', (left, right) => {
		if (left.name.toLowerCase() < right.name.toLowerCase()) {
			return 1;
		} else if (left.name.toLowerCase() > right.name.toLowerCase()) {
			return -1;
		} else {
			return 0;
		}
	}),
	new SortOption('Played', 'Played', (left, right) => {
		return left.played - right.played;
	}),
	new SortOption('Bonus', 'Bonus', (left, right) => {
		return left.bonus - right.bonus;
	}),
	new SortOption('Won', 'Won', (left, right) => {
		return left.won - right.won;
	}),
	new SortOption('Drew', 'Drew', (left, right) => {
		return left.drew - right.drew;
	}),
	new SortOption('Lost', 'Lost', (left, right) => {
		return left.lost - right.lost;
	}),
	new SortOption('Frames Won', 'Frames Won', (left, right) => {
		return left.framesWon - right.framesWon;
	}),
	new SortOption('Frames Lost', 'Frames Lost', (left, right) => {
		return left.framesLost - right.framesLost;
	}),
	new SortOption('Frames Difference', 'Frames Difference', (left, right) => {
		return left.frameDifference - right.frameDifference;
	})
];

export default {
	directions: sortDirections,
	options: sortOptions
};