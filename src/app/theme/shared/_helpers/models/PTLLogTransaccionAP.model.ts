export class PTLLogTransaccionAP {
    constructor (
        public logId : number,
        public aplicacionId : number,
        public fechaLogTransaccion : Date,
        public descripcionLog : string,
        public codigoError : string,
        public mensajeError : string,
        public usuarioGenerador : string
   ) {}
}
