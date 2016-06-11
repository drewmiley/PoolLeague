define([], function() {

	function IsTextFiltered(record, filter) {
		var filterValue = filter.CurrentText();
		filterValue = filterValue.toUpperCase();
		
		var recordValue = filter.Accessor(record);
		recordValue = recordValue.toUpperCase();
		return recordValue.indexOf(filterValue) === -1;
	}

	function IsOptionFiltered(record, filter) {
		var filterOption = filter.CurrentOption();
		if (!filterOption) {
			return;
		}

		var recordValue = filter.Accessor(record);
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

	return {
		IsFiltered: IsFiltered,
		SortArray: SortArray
	};
})