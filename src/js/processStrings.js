const prettyDate = (dateString) => {
	if (dateString.includes("T")) {
		return dateString.split("T")[0].split("-").reverse().join(".");
	} else {
		return dateString.split("-").reverse().join(".");
	}
};

const prettyDateTime = (utcDateTimeString) => {
	const [date, timeStringUTC] = utcDateTimeString.split("T");
	const [, , messageDay] = date.split("-");
	const [hour, minutes] = timeStringUTC.split(":");
	const today = new Date().getDate();
	if (today > Number(messageDay)) {
		return `${prettyDate(date)} ${hour}:${minutes}`;
	}
	return `${hour}:${minutes}`;
};

export { prettyDate, prettyDateTime };
