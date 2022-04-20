"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonCalendar = void 0;
const createDate_1 = __importDefault(require("./createDate"));
const getDaysInMonth_1 = __importDefault(require("./getDaysInMonth"));
const isWeekend_1 = __importDefault(require("./isWeekend"));
const dictionary_1 = __importDefault(require("./dictionary"));
class JsonCalendar {
    constructor(userParams = {}) {
        const { today = new Date() } = userParams;
        this.options = Object.assign({ abbreviate: 2, firstDayOfWeek: 0, languageCode: 'en', nextMonth: ' ', previousMonth: ' ', showToday: true, today, monthIndex: today.getMonth(), year: today.getFullYear() }, userParams);
        if (!['en', 'fr', 'es'].includes(this.options.languageCode)) {
            this.options.languageCode = 'en';
        }
        const language = dictionary_1.default[this.options.languageCode];
        this.monthNames = language.monthNames;
        this.today = (0, createDate_1.default)(today.getFullYear(), today.getMonth(), today.getDate());
        this.weeks = [];
        this.dayNames = [];
        for (let index = 0, len = language.dayNames.length; index < len; index += 1) {
            const dayName = language.dayNames[index];
            if (this.options.abbreviate > 1) {
                const dayAbbr = dayName.substr(0, this.options.abbreviate);
                this.dayNames[index] = { name: dayName, abbr: dayAbbr };
            }
            else {
                this.dayNames[index] = { name: dayName };
            }
        }
        this.buildWeeksArray();
    }
    buildWeeksArray() {
        let classNames;
        let i = 1;
        let week;
        const { options } = this;
        const firstDate = (0, createDate_1.default)(options.year, options.monthIndex, 1);
        const monthDays = (0, getDaysInMonth_1.default)(options.year, options.monthIndex);
        const firstDateIndex = firstDate.getDay();
        for (let w = 0; w < 6; w += 1) {
            let date;
            week = [];
            const { firstDayOfWeek } = this.options;
            for (let d = firstDayOfWeek; d < firstDayOfWeek + 7; d += 1) {
                classNames = [];
                if (w === 0 && firstDateIndex === 0 && firstDayOfWeek >= 1 && d < 7) {
                    date = (0, createDate_1.default)(firstDate.getFullYear(), firstDate.getMonth(), 1 - ((firstDateIndex + 7) - d));
                }
                else if (w === 0 && d < firstDateIndex) {
                    date = (0, createDate_1.default)(firstDate.getFullYear(), firstDate.getMonth(), 1 - (firstDateIndex - d));
                }
                else if (i > monthDays) {
                    date = (0, createDate_1.default)(firstDate.getFullYear(), firstDate.getMonth(), i);
                    i += 1;
                }
                else {
                    classNames.push('month-day');
                    date = (0, createDate_1.default)(firstDate.getFullYear(), firstDate.getMonth(), i);
                    i += 1;
                    if (options.showToday &&
                        date.toDateString() === this.today.toDateString()) {
                        classNames.push('today');
                    }
                }
                if ((0, isWeekend_1.default)(date)) {
                    classNames.push('weekend-day');
                }
                const day = {
                    className: classNames.join(' '),
                    id: `day${date.getTime()}`,
                    day: date.getDate(),
                    date: date,
                    monthIndex: date.getMonth(),
                    year: date.getFullYear()
                };
                week.push(day);
            }
            this.weeks.push(week);
        }
    }
    changeMonth(year, monthIndex) {
        this.options.year = year;
        this.options.monthIndex = monthIndex;
        this.buildWeeksArray();
    }
    getDayAbbr(index) {
        var _a;
        const dayName = this.dayNames[index];
        return (_a = dayName === null || dayName === void 0 ? void 0 : dayName.abbr) !== null && _a !== void 0 ? _a : '';
    }
    getDayName(index) {
        return this.dayNames[index].name;
    }
    getMonthName(index) {
        return this.monthNames[index];
    }
}
exports.JsonCalendar = JsonCalendar;
