import { PropertyValidator } from "nativescript-ui-dataform";

export class MaxTimeValidator extends PropertyValidator {
    constructor() {
        super();
        this.errorMessage = "Value for time cannot be more then 24";
    }

    public validate(value: any, propertyName: string): boolean {
        var number = Number.parseInt(value);
        return number <= 24;
    }
}

export class MinTimeValidator extends PropertyValidator {
    constructor() {
        super();
        this.errorMessage = "Value for time cannot be less then 0";
    }

    public validate(value: any, propertyName: string): boolean {
        var number = Number.parseInt(value);
        return number >= 0;
    }
}