import {createStore, combineReducers, applyMiddleware} from 'redux'
import CONSTANTES from './Constantes'
import SagasUser from './sagas/SagasUser'
import SagasRevista from './sagas/SagasRevista'
import {reducer as form} from 'redux-form'
import createSagaMiddleware from 'redux-saga'
import SagasCartera from './sagas/SagasCartera';

const reducerPrueba=(state=[], action)=>state;

const reducerSesion = (state = null, action) => {
    switch (action.type) {
        case CONSTANTES.ESTABLECERSESION:
            return action.usuario;
        case CONSTANTES.CERRARSESION:
            return null;
        default:
            return state;
    }
}

const reducerUsuario = (state = { profile: null }, action) => {
    switch (action.type) {
        case CONSTANTES.OBTENERUSUARIO:
            return {profile:action.profile}
        default:
            return state;
    }
}

const reducerRevista = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTES.PUT_ARTICULOS_TIPO_USUARIO:
            return {...state,
                articulosPublicados: action.articulos_publicados,
                articulosPortada: action.articulos_portada,
            };
        case CONSTANTES.PUT_ARTICULOS:
                    return {...state, articulos: action.articulos};
                    
        case CONSTANTES.ADD_TIPOS_USUARIO:
                return {...state, UsuarioTipos: action.tiposUsuario};

        case CONSTANTES.PUT_CATEGORIAS:
                return {...state, categorias: action.categorias};
        case CONSTANTES.GETARTICULOSLUG:
            return {...state, slug: action.slug };

        case CONSTANTES.PUT_ARTICULO_DETAIL:
            return {
                ...state,
                articulo: action.articulo
            };
        default:
            return state;
    }
};


const InitialStateCarteraUsuario={
    polizas:[],
    cartera:[],
    clientes:[],
    prospectos:[]
}
const reducerCarteraUsuario = (state =InitialStateCarteraUsuario, action) => {
    switch (action.type) {
        case CONSTANTES.PUT_POLIZAS_USUARIO:
            return {...state, 
                polizas: action.polizas,
            };
        case CONSTANTES.PUT_POLIZAS_USUARIO_CARTERA:
            return {
                ...state,
                cartera: action.polizas,
            };
        case CONSTANTES.PUT_CLIENTES_USUARIO_CARTERA:
            return {
                ...state,
                clientes: action.clientes,
            };

        case CONSTANTES.PUT_PROSPECTOS_USUARIO_CARTERA:
            return {
                ...state,
                prospectos: action.prospectos,
            };
        default:
            return state;
    }
};


let reducerDentrodePoliza=(state={},action)=>{
    switch(action.type){
        case CONSTANTES.PUT_POLIZA_DETAIL:
            return{...state, detailPoliza:action.poliza}
        case CONSTANTES.OBTENERRECIBOSENPOLIZA:
            return{...state, recibos:action.recibos}
        case CONSTANTES.PUT_ARCHIVOS_POLIZA:
            return {...state, fileList: action.archivosPoliza }
        case CONSTANTES.OBTENERCOMENTARIOSPOLIZA:
            return{...state,comentarios:action.id}
        case CONSTANTES.OBTENEROBJETOPERSONA:
            return{...state,persona:action.id,totalpersona:action.id.length}
        case CONSTANTES.OBTENEROBJETOVEHICULO:
            return{...state,vehiculo:action.id,totalvehiculo:action.id.length}
        case CONSTANTES.OBTENEROBJETOINMUEBLE:
            return{...state,inmueble:action.id,totalinmueble:action.id.length}
        case CONSTANTES.OBTENEROBJETOOBJETO:
            return{...state,objeto:action.id,totalobjeto:action.id.length}
        case CONSTANTES.OBTENERHISTORIALPOLIZA:
            return{...state,historial:action.id}
        default:
            return state;
    }
}

// const initialState = {fileList:[], file:{}, uploading:false}
// const reducerArchivosPoliza = (state = initialState, action) => {
//     switch (action.type) {
//         case CONSTANTES.PUT_ARCHIVOS_POLIZA:
//             return {...state, fileList: action.archivosPoliza }
//         case CONSTANTES.ADD_ARCHIVO_POLIZA:
//             return {...state, fileList: [...state.fileList, action.file] };

//         case CONSTANTES.DELETE_ARCHIVO_POLIZA:
//                 if (action.idArchivo) {
//                     let id = action.idArchivo
//                     var indexArchivo = state.fileList.findIndex(item => item.id === id)
//                     state.fileList.splice(indexArchivo, 1)
//                 }
//                 return {...state, fileList: [...state.fileList] }

//         case CONSTANTES.LIMPIAR_STATE:
//                 return initialState
//         default:
//             return state
//     }
// }

const sagaMiddleware=createSagaMiddleware()
const reducers=combineReducers({
    reducerSesion,
    reducerPrueba,
    reducerUsuario,
    reducerRevista,
    reducerCarteraUsuario,
    reducerDentrodePoliza,
    form
})


const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(SagasUser);
sagaMiddleware.run(SagasRevista);
sagaMiddleware.run(SagasCartera)
export default store;
