export class PTLSitiosAP {
    constructor (
        public sitioId : number,
        public aplicacionId : number,
        public nombreSitio : string,
        public descripcionSitio : string,
        public utlSitio : string,
        public puertoSitio : number, // TODO Crear este campo en BD y API
        public estadoSitio : number
   ) {}
}
