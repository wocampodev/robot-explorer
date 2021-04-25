class ListaUsuarios {

    static _instance;
    _lista = [];

    static get instance() {
        return this._instance || ( this._instance = new this() );
    }

    constructor() {}

    agregar( usuario ) {
        this._lista.push( { ...usuario } );
        console.log( this._lista );
        return usuario;
    }

    actualizarNombre( id, nombre ) {

        for ( const usuario of this._lista ) {
            if ( usuario.id === id ) {
                usuario.nombre = nombre;
                break;
            }
        }

        console.log('===== Updating... =====');
        console.log(this._lista);

    }

    getListado() {
        return this._lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }

    getIndividual( id ) {
        return this._lista.find( usuario => usuario.id === id );
    }
    
    getListadoPorSala( sala ) {
        return this._lista.filter( usuario => usuario.sala === sala );
    }

    borrar( id ) {
        const tempUsuario = this.getIndividual( id );
        this._lista = this._lista.filter( usuario => usuario.id !== id );
        console.log( this._lista );
        return tempUsuario;
    }

}

module.exports = ListaUsuarios;