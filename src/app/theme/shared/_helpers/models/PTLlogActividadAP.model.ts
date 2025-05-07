export class PTLLogActividadAP {
    constructor (
        public logId : number,
        public aplicacionId : number,
        public suscriptorId : number,
        public usuarioId : number,
        public fechaLogActividad : Date,
        public descripcionLog : string
    ) {}
}
