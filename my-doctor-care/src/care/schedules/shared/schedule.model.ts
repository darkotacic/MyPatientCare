export class Schedules {
    schedules: Array<Schedule>;
    freeDays: Map<number, string>;

    constructor() {
        this.schedules = new Array<Schedule>();
        this.freeDays = new Map<number, string>();
    }
}

// tslint:disable-next-line:max-classes-per-file
export class Schedule {
    id: number;
    dayOfWeek: number;
    dayOfWeekName: string;
    startTime: number;
    endTime: number;
    doctorId: string;
}
