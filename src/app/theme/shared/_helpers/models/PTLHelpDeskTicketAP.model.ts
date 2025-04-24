export class PTLHelpDeskTicketsAP {
    constructor (
        public ticketId : number,
        public aplicacionId : number,
        public nombreTicket : string,
        public descripcionTicket : string,
        public estadoTicket : boolean
    ) {}
}
