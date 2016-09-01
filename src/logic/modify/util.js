function DateFormatter(index, dates) {
    const fullDate = dates[index];
    const month = fullDate.getMonth() + 1;
    const date = fullDate.getDate();
    return date + '/' + month;
}

function IsTextFiltered(record, filter) {
	const filterValue = filter.CurrentText.toUpperCase();	
	const recordValue = filter.Accessor(record).toUpperCase();
	return recordValue.indexOf(filterValue) === -1;
}

function IsOptionFiltered(record, filter) {
	const filterOption = filter.CurrentOption;
	if (!filterOption) {
		return;
	}

	const recordValue = filter.Accessor(record);
	return filterOption.Value.constructor === Array ?
		filterOption.Value.indexOf(recordValue) === -1:
		recordValue != filterOption.Value;
}


function IsFiltered(record, activeFilters) {
	if (activeFilters.length == 0) {
		return false;
	}

	for (var i = 0; i < activeFilters.length; i++) {
		var filter = activeFilters[i];
		if ((filter.Type === 'text' && IsTextFiltered(record, filter)) ||
			(filter.Type === 'select' && IsOptionFiltered(record, filter))) {

			return true;
		}
	}
	return false;
}

function SortArray(array, direction, comparison, secondaryDirection, secondaryComparision) {

	for (var i = 0; i < array.length; i++) {
		var original = array[i];
		for (var j = i + 1; j < array.length; j++) {
			var swap = array[j];

			if (comparison(original, swap) < 0 === direction ||
				(comparison(original, swap) === 0 && secondaryComparision(original, swap) < 0 === secondaryDirection)) {
				array[j] = original;
				array[i] = swap;
				original = swap;
			}
		}
	}

	return array;
}

export default {
	DateFormatter,
	IsFiltered,
	SortArray
};