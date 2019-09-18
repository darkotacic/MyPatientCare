export class Holiday {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    startDateString: string;
    endDateString: string;

    constructor(id: number, name : string, startDate: Date, endDate: Date) {
        this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}