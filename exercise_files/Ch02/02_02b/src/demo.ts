interface Contact extends Address {
    id: number;
    name: string;
    birthDate?: Date;
}

interface Address {
    line1?: string;
    line2?: string;
    state?: string;
    region?: string;
    postalCode?: string;
}

let primaryContact: Contact = {
    // birthDate: new Date("01-01-2024"),
    id: 12345,
    name: "Elliot H",
    // postalCode: "12345"
}