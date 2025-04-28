export class PTLUsuarios {
    constructor (
        public usuarioId : number,
        public fotoUsuario : string,
        public identificacionUsuario : number,
        public nombreUsuario : string,
        public descripcionUsuario : string,
        public correoUsuario : string,
        public claveUsuario : string,
        public estadoUsuario : boolean
   ) {}
}
