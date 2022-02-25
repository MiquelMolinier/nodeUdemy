const path = require("path");
const fs = require("fs");
class Ticket {
    constructor(number, desk) {
        this.number = number;
        this.desk = desk;
    }
}
class TicketControl {
    constructor() {
        this.last = 0;
        this.date = new Date().getDate();
        this.tickets = [];
        this.last4 = [];
        this.init();
    }
    init() {
        const { last, date, tickets, last4 } = require("../db/data.json");
        if (date === this.date) {
            this.tickets = tickets;
            this.last = last;
            this.last4 = last4;
        } else {
            this.savedb();
        }
    }
    savedb() {
        const dbPath = path.join(__dirname, "../db/data.json");
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }
    get toJson() {
        return {
            last: this.last,
            date: this.date,
            tickets: this.tickets,
            last4: this.last4,
        };
    }
    next() {
        this.last += 1;
        this.tickets.push(new Ticket(this.last, null));
        this.savedb();
        return `Ticket ${this.last}`;
    }
    serve(desk) {
        if (this.tickets.length === 0) {
            return null;
        }
        const ticket = this.tickets.shift();
        ticket.desk = desk;
        this.last4.unshift(ticket);
        if (this.last4.length > 4) this.last4.pop();
        this.savedb();
        return ticket;
    }
}
module.exports = TicketControl;
