export class PTLLogActualizacionAP {
    constructor (
        public logId : number,
        public aplicacionId : number,
        public versionId : number,
        public suscriptorId : number,
        public suscriptorVersionId : number,
        public usuarioActualizacion : number,
        public fechaLogActualizacion : Date
    ) {}
}
