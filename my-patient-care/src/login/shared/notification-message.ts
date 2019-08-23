export class NotificationMessage {
    to: string;
    collapse_key: string;
    notification: Notification;

    constructor(fcmtoken : string,min : number) {
        this.to = fcmtoken;
        this.collapse_key = "type_a";
        this.notification = new Notification(min);
    }
}




export class Notification {
    body: string;
    title: string;

    constructor(min : number) {
        this.title = "Appointment Reminder!";
        this.body = "You have an appointment in "+ min + " minutes";
    }
}
