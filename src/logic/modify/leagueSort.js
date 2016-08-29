function Sort(name, value, sort, isDefault) {
	let self = this;
	self.name = name;
	self.value = value;
	self.sort = sort;
	self.isDefault = isDefault;
}

const sortDirections = [new Sort('Asc', 'Asc', true, true),
	new Sort('Desc', 'Desc', false)];

const sortOptions = [new Sort('Pts', 'Pts', (left, right) => {
		return left.points - right.points;
	}),
	new Sort('Name', 'Name', (left, right) => {
		if (left.name.toLowerCase() < right.name.toLowerCase()) {
			return 1;
		} else if (left.name.toLowerCase() > right.name.toLowerCase()) {
			return -1;
		} else {
			return 0;
		}
	}, true),
	new Sort('Played', 'Played', (left, right) => {
		return left.played - right.played;
	}),
	new Sort('Bonus', 'Bonus', (left, right) => {
		return left.bonus - right.bonus;
	}),
	new Sort('Won', 'Won', (left, right) => {
		return left.won - right.won;
	}),
	new Sort('Drew', 'Drew', (left, right) => {
		return left.drew - right.drew;
	}),
	new Sort('Lost', 'Lost', (left, right) => {
		return left.lost - right.lost;
	}),
	new Sort('Frames Won', 'Frames Won', (left, right) => {
		return left.framesWon - right.framesWon;
	}),
	new Sort('Frames Lost', 'Frames Lost', (left, right) => {
		return left.framesLost - right.framesLost;
	})
];

export default {
	directions: sortDirections,
	options: sortOptions
};