interface Contact {
    id: number;
}

const currentUser = {
    id: 1234,
    roles: ["ContactEditor"],
    isAuthenticated(): boolean {
        return true;
    },
    isInRole(role: string): boolean {
        return this.roles.contains(role);
    },
};

// Decorator Factory -> function that creaetes decorators, i.e. current decorator definition becomes the return value of another (dec factory) function

// 'authorize' method decorator
function authorize(role: string) {
    return function authorizeDecorator( // <-- decorator factory wrapper
        target: any,
        property: string,
        descriptor: PropertyDescriptor
    ) {
        // copy original logic so it is not lost when function below overwrites it
        const wrapped = descriptor.value;

        descriptor.value = function () {
            if (!currentUser.isAuthenticated()) {
                throw Error("User is not authenticated");
            }
            if (!currentUser.isInRole(role)) {
                throw Error(`User is not in role ${role}`);
            }
    
            return wrapped.apply(this, arguments);
        };
    };
}

class ContactRepository {
    private contacts: Contact[] = [];

    @authorize("ContactViewer")
    getContactById(id: number): Contact | null {
     
        const contact = this.contacts.find((x) => x.id === id);
        return contact;
    }

    @authorize("ContactEditor")
    save(contact: Contact): void {
        const existing = this.getContactById(contact.id);

        if (existing) {
            Object.assign(existing, contact);
        } else {
            this.contacts.push(contact);
        }
    }
}
