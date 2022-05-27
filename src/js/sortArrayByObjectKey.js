function sortArrayByObjectKey(array, key) {
	for (let index = 0; index < array.length - 1; index++) {
		for (let jndex = 0; jndex < array.length - 1; jndex++) {
			if (array[jndex][key] > array[jndex + 1][key]) {
				let first_el = array[jndex];
				array[jndex] = array[jndex + 1];
				array[jndex + 1] = first_el;
			}
		}
	}
	return array;
}

export { sortArrayByObjectKey }