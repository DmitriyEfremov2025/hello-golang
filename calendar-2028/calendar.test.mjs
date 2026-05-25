import assert from "node:assert/strict";
import {
	MONTHS,
	RUSSIAN_HOLIDAYS,
	RUSSIAN_HOLIDAY_STORIES,
	YEAR,
	buildMonthWeeks,
	daysInMonth,
	formatDate,
	getRussianHoliday,
	getRussianHolidayStory,
	isLeapYear,
	mondayFirstWeekday,
} from "./calendar.js";

assert.equal(YEAR, 2028);
assert.equal(isLeapYear(YEAR), true);
assert.equal(MONTHS.length, 12);
assert.equal(daysInMonth(YEAR, 1), 29);
assert.equal(RUSSIAN_HOLIDAYS.size, 14);
assert.equal(getRussianHoliday("2028-01-07"), "Рождество Христово");
assert.equal(getRussianHoliday("2028-03-08"), "Международный женский день");
assert.equal(getRussianHoliday("2028-11-04"), "День народного единства");
assert.equal(getRussianHoliday("2028-12-31"), null);
assert.equal(formatDate(YEAR, 10, 4), "2028-11-04");
assert.equal(getRussianHolidayStory("День Победы").scene, "victory");
assert.equal(getRussianHolidayStory("День России").melody.length, 8);
assert.equal(getRussianHolidayStory("Неизвестный праздник"), null);

const uniqueHolidayNames = new Set(RUSSIAN_HOLIDAYS.values());
for (const holidayName of uniqueHolidayNames) {
	const story = RUSSIAN_HOLIDAY_STORIES[holidayName];
	assert.ok(story, `Missing story for ${holidayName}`);
	assert.equal(story.icons.length, 5);
	assert.equal(story.melody.every((frequency) => frequency > 0), true);
}

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
