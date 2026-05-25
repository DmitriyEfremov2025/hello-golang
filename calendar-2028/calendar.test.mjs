import assert from "node:assert/strict";
import {
	MONTHS,
	YEAR,
	buildMonthWeeks,
	daysInMonth,
	isLeapYear,
	mondayFirstWeekday,
} from "./calendar.js";

assert.equal(YEAR, 2028);
assert.equal(isLeapYear(YEAR), true);
assert.equal(MONTHS.length, 12);
assert.equal(daysInMonth(YEAR, 1), 29);

const january = buildMonthWeeks(YEAR, 0);
assert.deepEqual(january[0], [null, null, null, null, null, 1, 2]);
assert.equal(mondayFirstWeekday(YEAR, 0), 5);

const totalDays = MONTHS.reduce((sum, _, monthIndex) => sum + daysInMonth(YEAR, monthIndex), 0);
assert.equal(totalDays, 366);

for (let monthIndex = 0; monthIndex < MONTHS.length; monthIndex += 1) {
	const weeks = buildMonthWeeks(YEAR, monthIndex);
	assert.equal(weeks.every((week) => week.length === 7), true);
	assert.equal(
		weeks.flat().filter((day) => day !== null).length,
		daysInMonth(YEAR, monthIndex),
	);
}

console.log("Calendar 2028 checks passed");
