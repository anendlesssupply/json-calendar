export interface CalendarOptions {
    abbreviate: number;
    firstDayOfWeek: number;
    languageCode: string;
    monthIndex: number;
    nextMonth: string;
    previousMonth: string;
    showToday: boolean;
    today: Date;
    year: number;
}
export interface CalendarDay {
    className: string;
    id: string;
    day: number;
    date: Date;
    monthIndex: number;
    year: number;
}
export declare type CalendarWeek = CalendarDay[];
export interface CalendarDayName {
    abbr?: string;
    name: string;
}
export declare class JsonCalendar {
    dayNames: CalendarDayName[];
    monthNames: string[];
    options: CalendarOptions;
    today: Date;
    weeks: CalendarWeek[];
    constructor(userParams?: Partial<CalendarOptions>);
    private buildWeeksArray;
    changeMonth(year: number, monthIndex: number): void;
    getDayAbbr(index: number): string;
    getDayName(index: number): string;
    getMonthName(index: number): string;
}
