export default class Datetime {
    private _year: number;
    private _month: number;
    private _date: number;
    private _hours: number;
    private _minutes: number;

    constructor(year: number, month: number, date: number, hours: number, minutes: number) {
        this.year = year;
        this.month = month;
        this.date = date;
        this.hours = hours;
        this.minutes = minutes;
    }

    get year(): number {
        return this._year;
    }

    set year(value: number) {
        if (value < 1) {
            value = new Date().getFullYear();
        }
        this._year = value;
    }

    get month(): number {
        return this._month;
    }

    set month(value: number) {
        if (value < 1) {
            value = new Date().getMonth() + 1;
        }
        this._month = value;
    }

    get date(): number {
        return this._date;
    }

    set date(value: number) {
        if (value < 1) {
            value = new Date().getDate();
        }
        this._date = value;
    }

    get hours(): number {
        return this._hours;
    }

    set hours(value: number) {
        if (value < 0) {
            value = 0;
        }
        this._hours = value;
    }

    get minutes(): number {
        return this._minutes;
    }

    set minutes(value: number) {
        if (value < 0) {
            value = 0;
        }
        this._minutes = value;
    }

    isLaterThan(datetime: Datetime): boolean {
        if (this.year > datetime.year) {
            return true;
        }
        if (this.year === datetime.year) {
            if (this.month > datetime.month) {
                return true;
            }
            if (this.month === datetime.month) {
                if (this.date > datetime.date) {
                    return true;
                }
                if (this.date === datetime.date) {
                    if (this.hours > datetime.hours) {
                        return true;
                    }
                    if (this.hours === datetime.hours) {
                        return this.minutes > datetime.minutes;
                    }
                }
            }
        }
        return false;
    }

    isSameDatetime(datetime: Datetime): boolean {
        if (this.year === datetime.year) {
            if (this.month === datetime.month) {
                if (this.date === datetime.date) {
                    if (this.hours === datetime.hours) {
                        return this.minutes === datetime.minutes;
                    }
                }
            }
        }
        return false;
    }
}
