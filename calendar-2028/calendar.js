export const YEAR = 2028;

export const MONTHS = [
	"Январь",
	"Февраль",
	"Март",
	"Апрель",
	"Май",
	"Июнь",
	"Июль",
	"Август",
	"Сентябрь",
	"Октябрь",
	"Ноябрь",
	"Декабрь",
];

export const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export const RUSSIAN_HOLIDAYS = new Map([
	["2028-01-01", "Новогодние каникулы"],
	["2028-01-02", "Новогодние каникулы"],
	["2028-01-03", "Новогодние каникулы"],
	["2028-01-04", "Новогодние каникулы"],
	["2028-01-05", "Новогодние каникулы"],
	["2028-01-06", "Новогодние каникулы"],
	["2028-01-07", "Рождество Христово"],
	["2028-01-08", "Новогодние каникулы"],
	["2028-02-23", "День защитника Отечества"],
	["2028-03-08", "Международный женский день"],
	["2028-05-01", "Праздник Весны и Труда"],
	["2028-05-09", "День Победы"],
	["2028-06-12", "День России"],
	["2028-11-04", "День народного единства"],
]);

export function isLeapYear(year) {
	return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

export function daysInMonth(year, monthIndex) {
	return new Date(year, monthIndex + 1, 0).getDate();
}

export function mondayFirstWeekday(year, monthIndex) {
	const sundayFirst = new Date(year, monthIndex, 1).getDay();
	return (sundayFirst + 6) % 7;
}

export function formatDate(year, monthIndex, day) {
	return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function getRussianHoliday(date) {
	return RUSSIAN_HOLIDAYS.get(date) ?? null;
}

export function buildMonthWeeks(year, monthIndex) {
	const days = daysInMonth(year, monthIndex);
	const leadingEmptyDays = mondayFirstWeekday(year, monthIndex);
	const cells = [
		...Array(leadingEmptyDays).fill(null),
		...Array.from({ length: days }, (_, index) => index + 1),
	];

	while (cells.length % 7 !== 0) {
		cells.push(null);
	}

	return Array.from({ length: cells.length / 7 }, (_, weekIndex) =>
		cells.slice(weekIndex * 7, weekIndex * 7 + 7),
	);
}

function renderMonth(monthIndex) {
	const section = document.createElement("section");
	section.className = "month-card";
	section.setAttribute("aria-labelledby", `month-${monthIndex}`);

	const title = document.createElement("h2");
	title.id = `month-${monthIndex}`;
	title.textContent = MONTHS[monthIndex];
	section.append(title);

	const table = document.createElement("table");
	table.className = "month-table";
	table.setAttribute("aria-label", `${MONTHS[monthIndex]} ${YEAR}`);

	const thead = document.createElement("thead");
	const headerRow = document.createElement("tr");
	for (const weekday of WEEKDAYS) {
		const th = document.createElement("th");
		th.scope = "col";
		th.textContent = weekday;
		headerRow.append(th);
	}
	thead.append(headerRow);
	table.append(thead);

	const tbody = document.createElement("tbody");
	for (const week of buildMonthWeeks(YEAR, monthIndex)) {
		const row = document.createElement("tr");
		for (const day of week) {
			const cell = document.createElement("td");
			if (day === null) {
				cell.className = "empty-day";
				cell.setAttribute("aria-hidden", "true");
			} else {
				const date = formatDate(YEAR, monthIndex, day);
				const holidayName = getRussianHoliday(date);
				cell.textContent = String(day);
				cell.setAttribute("data-date", date);

				if (holidayName) {
					cell.className = "holiday-day";
					cell.title = holidayName;
					cell.setAttribute("aria-label", `${day} ${MONTHS[monthIndex]}: ${holidayName}`);
				}
			}
			row.append(cell);
		}
		tbody.append(row);
	}
	table.append(tbody);
	section.append(table);

	return section;
}

function renderHolidayList(root) {
	root.replaceChildren(
		...Array.from(RUSSIAN_HOLIDAYS, ([date, name]) => {
			const item = document.createElement("li");
			const [year, month, day] = date.split("-");
			item.innerHTML = `<time datetime="${date}">${day}.${month}.${year}</time><span>${name}</span>`;
			return item;
		}),
	);
}

export function renderCalendar(root) {
	root.replaceChildren(...MONTHS.map((_, monthIndex) => renderMonth(monthIndex)));
}

if (typeof document !== "undefined") {
	document.addEventListener("DOMContentLoaded", () => {
		const root = document.querySelector("#calendar-grid");
		if (root) {
			renderCalendar(root);
		}

		const holidayList = document.querySelector("#holiday-list");
		if (holidayList) {
			renderHolidayList(holidayList);
		}
	});
}
