interface Contact {
    id: number;
}

const currentUser = {
    id: 1234,
    roles: ["ContactEditor"],
    isAuthenticated(): boolean {
        return true
    },
    isInRole(role: string): boolean {
        return this.roles.contains(role);
    }
}

// 'authorize' method decorator
function authorize(
    target: any, // object to which the decorator is being applied
    property: string, // name of the property to which the decorator is being applied
    descriptor: PropertyDescriptor // object containing current metadata about the property
) {
    // Option 1: edit descriptor in place to modify behavior of the method
        // descriptor.value = function () {}

    // Option 2: return a new descriptor object that replaces the current one
        // return {
        //     // ...make any changes here
        // } as PropertyDescriptor
    
    const wrapped = descriptor.value // copy original logic so it is not lost when function below overwrites it

    descriptor.value = function () {
        if (!currentUser.isAuthenticated()) {
            throw Error("User is not authenticated");
        }

        try {
            return wrapped.apply(this, arguments);
        } catch (ex) {
            // some logging logic
            throw ex;
        }
    }
}

class ContactRepository {
    private contacts: Contact[] = [];

    @authorize("ContactViewer")
    getContactById(id: number): Contact | null {
        if (!currentUser.isInRole("ContactViewer")) {
            throw Error("User not authorized to execute this action");
        }

        const contact = this.contacts.find(x => x.id === id);
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