export class PTLPaqueteSC {
    constructor (
        public suscriptorPaqueteId : number,
        public suscriptorId : number,
        public paqueteId : number,
        public fechaInicio : Date,
        public fechaVencimiento : Date,
        public codigoLicencia : string,
        public estadoLicencia : boolean
   ) {}
}
