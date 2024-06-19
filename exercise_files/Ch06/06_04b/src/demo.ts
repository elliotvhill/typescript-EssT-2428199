interface Customer {
    /** saves the customer somewhere */
    save(): void
}

class Customer { } // TS considers every class def to also be an interface

const customer = new Customer()
customer.save = function () { }

const myVar = window.MY_VAR