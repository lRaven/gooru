function sortArrayByObjectKey({ array, key, direction }) {
	let copy_array = [...array];

	switch (direction) {
		case 'ascending': {
			return copy_array.sort(function (a, b) {
				return ('' + a[key]).localeCompare(b[key]);
			})
		}
		case 'descending': {
			return copy_array.sort(function (a, b) {
				return ('' + b[key]).localeCompare(a[key]);
			})
		}
	}
}

function sortArrayByNumberKey({ array, key, direction }) {
	let copy_array = [...array];

	switch (direction) {
		case 'ascending': {
			return copy_array.sort((a, b) => a[key] - b[key])
		}
		case 'descending': {
			return copy_array.sort((a, b) => b[key] - a[key])
		}
	}
}

function sortArrayByDate({ array, key, direction }) {
	let copy_array = [...array];

	switch (direction) {
		case 'ascending': {
			return copy_array.sort(function (a, b) {
				return new Date(a[key]) - new Date(b[key])
			})
		}
		case 'descending': {
			return copy_array.sort(function (a, b) {
				return new Date(b[key]) - new Date(a[key])
			})
		}
	}
}

export { sortArrayByObjectKey, sortArrayByNumberKey, sortArrayByDate }