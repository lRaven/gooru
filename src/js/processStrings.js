const prettyDate = (dateString) => {
	if (dateString.includes('T')) {
		return dateString.split('T')[0].split('-').reverse().join('.');
	} else {
		return dateString.split('-').reverse().join('.');
	}

}

export { prettyDate };
