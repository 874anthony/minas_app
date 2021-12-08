function addDate(date, days) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

function getLocalDate(date) {
	return date.toLocaleString();
}

export { addDate, getLocalDate };
