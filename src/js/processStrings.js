const prettyDate = (dateString) => {
    console.log(typeof dateString);
    if (dateString.includes('T')) {
        return dateString.split('T')[0].split('-').reverse().join('.');
    } else {
        return dateString.split('-').reverse().join('.');
    }
    
}

export { prettyDate };
