export class PTLSeguimientoRQ {
    constructor (
        public sieguimientoId : number,
        public requerimientoId : number,
        public nombreSeguimiento : string,
        public descripcionSeguimiento : string,
        public estadoSeguimiento : number
   ) {}
}
