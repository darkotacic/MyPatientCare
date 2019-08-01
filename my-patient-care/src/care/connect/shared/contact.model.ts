import { ContactInfo } from "./contact-info.model";

export class Contact {
    id: string;
    fullName: string;
    doctorType: string;
    monogram: string;
    contactInfoItems: Array<ContactInfo>;
}
