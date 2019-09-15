export class Schedules {
    schedules: Array<Schedule>;
    freeDays: FreeDays;

    constructor(map: Map<number,string>, schedules : Array<Schedule>) {
        this.schedules = schedules;
        this.freeDays = new FreeDays(map);
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

    constructor() {
        this.dayOfWeek = null;
        this.startTime = 0;
        this.endTime = 0;
    }
}

export class FreeDays {
    freeDays: Map<number, string>;

    constructor(map: Map<number,string>) {
        this.freeDays = map;        
    }
}
