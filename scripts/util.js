define([], function() {
	
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
		SortArray: SortArray
	};
})