const moment = require("moment");

const convertDate = (startDate, endDate) => {
	const newStartDate = moment.utc(startDate, "YYYY-MM-DD", true);
	const newEndDate = moment.utc(endDate, "YYYY-MM-DD", true);
	const duration = newEndDate.diff(newStartDate, "days");

	return { newStartDate, newEndDate, duration };
};

const parseDate = (date) => {
	return moment.parseZone(date).format("LL")
}

module.exports = { parseDate, convertDate }