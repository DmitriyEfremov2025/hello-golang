import assert from "node:assert/strict";
import {
	DEFAULT_YEAR,
	MONTHS,
	RUSSIAN_HOLIDAY_DEFINITIONS,
	RUSSIAN_HOLIDAYS,
	RUSSIAN_HOLIDAY_STORIES,
	YEAR,
	YEARS,
	buildMonthWeeks,
	daysInMonth,
	formatDate,
	getRussianHoliday,
	getRussianHolidaysForYear,
	getRussianHolidayStory,
	isLeapYear,
	mondayFirstWeekday,
	totalDaysInYear,
} from "./calendar.js";

assert.equal(YEAR, 2028);
assert.equal(DEFAULT_YEAR, 2028);
assert.deepEqual(YEARS, [2026, 2027, 2028]);
assert.equal(isLeapYear(YEAR), true);
assert.equal(MONTHS.length, 12);
assert.equal(daysInMonth(YEAR, 1), 29);
assert.equal(RUSSIAN_HOLIDAYS.size, RUSSIAN_HOLIDAY_DEFINITIONS.length * YEARS.length);
assert.equal(getRussianHoliday("2028-01-07"), "Рождество Христово");
assert.equal(getRussianHoliday("2026-02-23"), "День защитника Отечества");
assert.equal(getRussianHoliday("2027-05-09"), "День Победы");
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

for (const year of YEARS) {
	assert.equal(getRussianHolidaysForYear(year).length, 14);
	assert.equal(daysInMonth(year, 1), isLeapYear(year) ? 29 : 28);
	assert.equal(totalDaysInYear(year), isLeapYear(year) ? 366 : 365);
}

assert.equal(isLeapYear(2026), false);
assert.equal(isLeapYear(2027), false);
assert.equal(totalDaysInYear(2026), 365);
assert.equal(totalDaysInYear(2027), 365);
assert.equal(totalDaysInYear(2028), 366);
assert.equal(mondayFirstWeekday(2026, 0), 3);
assert.equal(mondayFirstWeekday(2027, 0), 4);
assert.equal(mondayFirstWeekday(2028, 0), 5);

const january = buildMonthWeeks(YEAR, 0);
assert.deepEqual(january[0], [null, null, null, null, null, 1, 2]);
assert.equal(mondayFirstWeekday(YEAR, 0), 5);

const totalDays = MONTHS.reduce((sum, _, monthIndex) => sum + daysInMonth(YEAR, monthIndex), 0);
assert.equal(totalDays, 366);

for (const year of YEARS) {
	for (let monthIndex = 0; monthIndex < MONTHS.length; monthIndex += 1) {
		const weeks = buildMonthWeeks(year, monthIndex);
		assert.equal(weeks.every((week) => week.length === 7), true);
		assert.equal(
			weeks.flat().filter((day) => day !== null).length,
			daysInMonth(year, monthIndex),
		);
	}
}

console.log("Calendar 2026-2028 checks passed");
