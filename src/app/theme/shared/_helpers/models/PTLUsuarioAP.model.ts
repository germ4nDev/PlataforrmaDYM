export class PTLsuarioAP {
    constructor (
        public usuarioId : number,
        public aplicacionId : number,
        public nombreUsuario : string,
        public claveUsuario : string,
        public correoUsuario : string,
        public estadoUsuario : number,
        public serviceToken : string
   ) {}
}
