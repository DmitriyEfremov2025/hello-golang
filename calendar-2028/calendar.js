export const YEARS = [2026, 2027, 2028];
export const DEFAULT_YEAR = 2028;
export const YEAR = DEFAULT_YEAR;

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

export const RUSSIAN_HOLIDAY_DEFINITIONS = [
	["01-01", "Новогодние каникулы"],
	["01-02", "Новогодние каникулы"],
	["01-03", "Новогодние каникулы"],
	["01-04", "Новогодние каникулы"],
	["01-05", "Новогодние каникулы"],
	["01-06", "Новогодние каникулы"],
	["01-07", "Рождество Христово"],
	["01-08", "Новогодние каникулы"],
	["02-23", "День защитника Отечества"],
	["03-08", "Международный женский день"],
	["05-01", "Праздник Весны и Труда"],
	["05-09", "День Победы"],
	["06-12", "День России"],
	["11-04", "День народного единства"],
];

export const RUSSIAN_HOLIDAYS = new Map(
	YEARS.flatMap((year) =>
		RUSSIAN_HOLIDAY_DEFINITIONS.map(([monthDay, holidayName]) => [`${year}-${monthDay}`, holidayName]),
	),
);

export const RUSSIAN_HOLIDAY_STORIES = {
	"Новогодние каникулы": {
		title: "Новогодний огонек",
		text: "Елка загорается, подарки кружатся в снегу, а короткая мелодия напоминает о семейных каникулах.",
		scene: "new-year",
		icons: ["❄", "🎄", "🎁", "⭐", "❄"],
		melody: [523, 659, 784, 1047, 784, 659, 698, 784],
	},
	"Рождество Христово": {
		title: "Рождественская звезда",
		text: "Звезда мягко поднимается над зимним городом и звучит спокойная светлая мелодия.",
		scene: "christmas",
		icons: ["✨", "⭐", "⛪", "❄", "✨"],
		melody: [392, 494, 587, 659, 587, 494, 440, 392],
	},
	"День защитника Отечества": {
		title: "Защитный щит",
		text: "Щит и звезда появляются на фоне ленты — маленькая сцена о защите и благодарности.",
		scene: "defender",
		icons: ["⭐", "🛡️", "🎖️", "⭐", "🎗️"],
		melody: [392, 392, 523, 587, 523, 392, 440, 494],
	},
	"Международный женский день": {
		title: "Весенний букет",
		text: "Цветы раскрываются один за другим под легкую мелодию начала весны.",
		scene: "womens-day",
		icons: ["🌷", "🌸", "💐", "🌼", "🌷"],
		melody: [659, 698, 784, 880, 784, 698, 659, 784],
	},
	"Праздник Весны и Труда": {
		title: "Весна и труд",
		text: "Солнце поднимается над цветами и рабочими инструментами — праздник обновления и труда.",
		scene: "spring-labor",
		icons: ["☀️", "🌱", "⚙️", "🌼", "🛠️"],
		melody: [523, 587, 659, 698, 784, 698, 659, 587],
	},
	"День Победы": {
		title: "Салют Победы",
		text: "Над праздничной лентой вспыхивает салют, а торжественная мелодия звучит как память и благодарность.",
		scene: "victory",
		icons: ["🎆", "⭐", "🎗️", "🌹", "🎆"],
		melody: [392, 523, 659, 784, 659, 523, 587, 659],
	},
	"День России": {
		title: "Триколор над городом",
		text: "Флаг мягко колышется над летним небом, напоминая о стране и ее людях.",
		scene: "russia",
		icons: ["⚪", "🔵", "🔴", "🏙️", "✨"],
		melody: [440, 523, 587, 659, 587, 523, 494, 440],
	},
	"День народного единства": {
		title: "Круг единства",
		text: "Разные фигурки собираются вокруг сердца — короткий мультфильм о согласии и общих делах.",
		scene: "unity",
		icons: ["🧑", "🤝", "❤️", "👩", "👨"],
		melody: [523, 587, 659, 523, 659, 698, 784, 659],
	},
};

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

export function getRussianHolidaysForYear(year) {
	return RUSSIAN_HOLIDAY_DEFINITIONS.map(([monthDay, holidayName]) => [`${year}-${monthDay}`, holidayName]);
}

export function getRussianHolidayStory(holidayName) {
	return RUSSIAN_HOLIDAY_STORIES[holidayName] ?? null;
}

export function totalDaysInYear(year) {
	return isLeapYear(year) ? 366 : 365;
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

function renderMonth(year, monthIndex) {
	const section = document.createElement("section");
	section.className = "month-card";
	section.setAttribute("aria-labelledby", `month-${year}-${monthIndex}`);

	const title = document.createElement("h2");
	title.id = `month-${year}-${monthIndex}`;
	title.textContent = MONTHS[monthIndex];
	section.append(title);

	const table = document.createElement("table");
	table.className = "month-table";
	table.setAttribute("aria-label", `${MONTHS[monthIndex]} ${year}`);

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
	for (const week of buildMonthWeeks(year, monthIndex)) {
		const row = document.createElement("tr");
		for (const day of week) {
			const cell = document.createElement("td");
			if (day === null) {
				cell.className = "empty-day";
				cell.setAttribute("aria-hidden", "true");
			} else {
				const date = formatDate(year, monthIndex, day);
				const holidayName = getRussianHoliday(date);
				cell.setAttribute("data-date", date);

				if (holidayName) {
					cell.className = "holiday-day";
					cell.title = holidayName;
					cell.setAttribute("aria-label", `${day} ${MONTHS[monthIndex]}: ${holidayName}`);
					cell.append(createHolidayButton(day, date, holidayName, monthIndex));
				} else {
					cell.textContent = String(day);
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

function createHolidayButton(day, date, holidayName, monthIndex) {
	const button = document.createElement("button");
	button.type = "button";
	button.className = "holiday-button";
	button.textContent = String(day);
	button.title = `Открыть мультфильм: ${holidayName}`;
	button.setAttribute("aria-label", `${day} ${MONTHS[monthIndex]}: открыть мультфильм про ${holidayName}`);
	button.addEventListener("click", () => openHolidayMovie(date, holidayName));
	return button;
}

function renderHolidayList(root, year) {
	root.replaceChildren(
		...getRussianHolidaysForYear(year).map(([date, name]) => {
			const item = document.createElement("li");
			const [year, month, day] = date.split("-");
			item.innerHTML = `<time datetime="${date}">${day}.${month}.${year}</time><span>${name}</span>`;
			return item;
		}),
	);
}

function renderYearControls(root) {
	root.replaceChildren(
		...YEARS.map((year) => {
			const button = document.createElement("button");
			button.type = "button";
			button.className = "year-button";
			button.dataset.year = String(year);
			button.textContent = String(year);
			button.addEventListener("click", () => renderSelectedYear(year));
			return button;
		}),
	);
}

function createSceneElement(icon, index) {
	const element = document.createElement("span");
	element.className = `movie-shape movie-shape-${index + 1}`;
	element.textContent = icon;
	element.setAttribute("aria-hidden", "true");
	return element;
}

function renderMovieScene(root, story) {
	root.className = `movie-scene scene-${story.scene}`;
	root.replaceChildren(...story.icons.map(createSceneElement));
}

let audioContext;
let activeAudioNodes = [];
let soundBarsTimeout;
let previouslyFocusedElement;

function stopHolidayMusic() {
	for (const node of activeAudioNodes) {
		try {
			node.stop();
		} catch {
			// Oscillators may already be stopped by their scheduled end time.
		}
		node.disconnect();
	}
	activeAudioNodes = [];
	window.clearTimeout(soundBarsTimeout);
	document.querySelector(".sound-bars")?.classList.remove("is-playing");
}

function playHolidayMusic(notes) {
	stopHolidayMusic();
	document.querySelector(".sound-bars")?.classList.add("is-playing");
	soundBarsTimeout = window.setTimeout(
		() => document.querySelector(".sound-bars")?.classList.remove("is-playing"),
		notes.length * 180,
	);

	const AudioContextClass = window.AudioContext ?? window.webkitAudioContext;
	if (!AudioContextClass) {
		return;
	}

	audioContext ??= new AudioContextClass();
	audioContext.resume();

	const startAt = audioContext.currentTime + 0.03;
	const noteLength = 0.18;

	for (const [index, frequency] of notes.entries()) {
		const oscillator = audioContext.createOscillator();
		const gain = audioContext.createGain();
		const start = startAt + index * noteLength;
		const end = start + noteLength * 0.86;

		oscillator.type = index % 2 === 0 ? "triangle" : "sine";
		oscillator.frequency.setValueAtTime(frequency, start);
		gain.gain.setValueAtTime(0.0001, start);
		gain.gain.exponentialRampToValueAtTime(0.12, start + 0.025);
		gain.gain.exponentialRampToValueAtTime(0.0001, end);

		oscillator.connect(gain).connect(audioContext.destination);
		oscillator.start(start);
		oscillator.stop(end + 0.02);
		activeAudioNodes.push(oscillator);
	}
}

function openHolidayMovie(date, holidayName) {
	const story = getRussianHolidayStory(holidayName);
	const modal = document.querySelector("#movie-modal");
	const scene = document.querySelector("#movie-scene");
	const title = document.querySelector("#movie-title");
	const dateElement = document.querySelector("#movie-date");
	const storyText = document.querySelector("#movie-story");
	const closeButton = document.querySelector("#movie-close");

	if (!story || !modal || !scene || !title || !dateElement || !storyText || !closeButton) {
		return;
	}

	previouslyFocusedElement = document.activeElement;
	renderMovieScene(scene, story);
	title.textContent = story.title;
	dateElement.textContent = `${date.split("-").reverse().join(".")} — ${holidayName}`;
	storyText.textContent = story.text;
	modal.hidden = false;
	document.body.classList.add("modal-open");
	closeButton.focus();
	playHolidayMusic(story.melody);
}

function closeHolidayMovie() {
	const modal = document.querySelector("#movie-modal");
	if (!modal) {
		return;
	}

	modal.hidden = true;
	document.body.classList.remove("modal-open");
	stopHolidayMusic();

	if (previouslyFocusedElement instanceof HTMLElement) {
		previouslyFocusedElement.focus();
	}
}

function setupHolidayMovieModal() {
	const modal = document.querySelector("#movie-modal");
	const closeButton = document.querySelector("#movie-close");
	if (!modal || !closeButton) {
		return;
	}

	closeButton.addEventListener("click", closeHolidayMovie);
	modal.addEventListener("click", (event) => {
		if (event.target === modal) {
			closeHolidayMovie();
		}
	});
	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && !modal.hidden) {
			closeHolidayMovie();
		}
	});
}

function renderYearFacts(year) {
	const totalDaysElement = document.querySelector("#total-days");
	const februaryDaysElement = document.querySelector("#february-days");
	const firstDayElement = document.querySelector("#first-day");

	if (totalDaysElement) {
		totalDaysElement.textContent = String(totalDaysInYear(year));
	}
	if (februaryDaysElement) {
		februaryDaysElement.textContent = String(daysInMonth(year, 1));
	}
	if (firstDayElement) {
		firstDayElement.textContent = WEEKDAYS[mondayFirstWeekday(year, 0)];
	}
}

function updateYearCopy(year) {
	const selectedYear = document.querySelector("#selected-year");
	const pageTitle = document.querySelector("#page-title");
	const lead = document.querySelector("#page-lead");
	const calendarGrid = document.querySelector("#calendar-grid");
	const holidayTitle = document.querySelector("#holiday-title");

	if (selectedYear) {
		selectedYear.textContent = String(year);
	}
	if (pageTitle) {
		pageTitle.textContent = `Календарь на ${year} год`;
	}
	if (lead) {
		lead.textContent = `Все месяцы ${year} года на одной адаптивной странице с выделенными праздниками России.`;
	}
	if (calendarGrid) {
		calendarGrid.setAttribute("aria-label", `Месяцы ${year} года`);
	}
	if (holidayTitle) {
		holidayTitle.textContent = `Официальные праздничные даты ${year}`;
	}
	document.title = `Календарь на ${year} год`;
}

function updateYearControls(year) {
	for (const button of document.querySelectorAll(".year-button")) {
		const isActive = button.dataset.year === String(year);
		button.classList.toggle("is-active", isActive);
		button.setAttribute("aria-pressed", String(isActive));
	}
}

function renderSelectedYear(year) {
	const calendarRoot = document.querySelector("#calendar-grid");
	const holidayList = document.querySelector("#holiday-list");
	if (!calendarRoot || !holidayList) {
		return;
	}

	updateYearCopy(year);
	renderYearFacts(year);
	updateYearControls(year);
	renderHolidayList(holidayList, year);
	renderCalendar(calendarRoot, year);
}

export function renderCalendar(root, year = DEFAULT_YEAR) {
	root.replaceChildren(...MONTHS.map((_, monthIndex) => renderMonth(year, monthIndex)));
}

if (typeof document !== "undefined") {
	document.addEventListener("DOMContentLoaded", () => {
		const yearControls = document.querySelector("#year-controls");
		if (yearControls) {
			renderYearControls(yearControls);
		}

		renderSelectedYear(DEFAULT_YEAR);
		setupHolidayMovieModal();
	});
}
