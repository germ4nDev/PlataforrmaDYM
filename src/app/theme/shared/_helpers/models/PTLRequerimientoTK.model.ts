export class PTLRequerimientoTK {
    constructor (
        public requerimientoId : number,
        public ticketId : number,
        public nombreRequerimiento : string,
        public descripcionRequerimiento : string,
        public estadoRequerimiento : boolean
   ) {}
}
