import { get } from "jquery";

type ContactName = string;
type ContactStatus = "active" | "inactive" | "new"
type ContactBirthDate = Date | number | string

interface Contact  {
    id: number;
    name: ContactName;
    birthDate?: ContactBirthDate;
    status?: ContactStatus;
    // email: string;
}

let primaryContact: Contact = {
    id: 12345,
    name: "Jamie Johnson",
    status: "active"
}

type ContactFields = keyof Contact

// const field: ContactFields = ""

const getValue = <T, U extends keyof T>(source: T, propertyName: U) => {
    return source[propertyName]
}

const value = getValue(contact, "status")