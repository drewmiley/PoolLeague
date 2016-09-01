function DateFormatter(index, dates) {
    const fullDate = dates[index];
    const month = fullDate.getMonth() + 1;
    const date = fullDate.getDate();
    return date + '/' + month;
}

function IsTextFiltered(record, filter) {
	const filterValue = filter.currentText.toUpperCase();	
	const recordValue = filter.accessor(record).toUpperCase();
	return recordValue.indexOf(filterValue) === -1;
}

function IsOptionFiltered(record, filter) {
	const filterOption = filter.currentOption;
	if (!filterOption) {
		return;
	}

	const recordValue = filter.accessor(record);
	return filterOption.value.constructor === Array ?
		filterOption.value.indexOf(recordValue) === -1:
		recordValue != filterOption.value;
}


function IsFiltered(record, activeFilters) {
	if (activeFilters.length == 0) {
		return false;
	}

	for (var i = 0; i < activeFilters.length; i++) {
		var filter = activeFilters[i];
		if ((filter.type === 'text' && IsTextFiltered(record, filter)) ||
			(filter.type === 'select' && IsOptionFiltered(record, filter))) {

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