const prettyDate = (dateString) => {
    return dateString.split('T')[0].split('-').reverse().join('.');
}

export { prettyDate };
