function sortArrayByObjectKey(array, key) {
	let unsorted_array = array.slice();

	for (let index = 0; index < unsorted_array.length - 1; index++) {
		for (let jndex = 0; jndex < unsorted_array.length - 1; jndex++) {
			if (unsorted_array[jndex][key] > unsorted_array[jndex + 1][key]) {
				const first_el = unsorted_array[jndex];
				unsorted_array[jndex] = unsorted_array[jndex + 1];
				unsorted_array[jndex + 1] = first_el;
			}
		}
	}
	return unsorted_array;
}

export { sortArrayByObjectKey }