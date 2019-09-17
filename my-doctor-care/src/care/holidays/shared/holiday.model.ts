export class Holiday {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    startDateString: string;
    endDateString: string;

    constructor() {
        this.name = "";
        this.startDate = null;
        this.endDate = null;
    }
}