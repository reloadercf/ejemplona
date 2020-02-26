import { takeEvery, call, select, put } from 'redux-saga/effects';
import CONSTANTES from '../Constantes';
import {actionPutArticulosTipoUsuario, actionPutArticuloDetail} from '../acciones/AccionesRevista';



const ArticulosPublicados = (idTipoUsuario) => fetch(`${CONSTANTES.URLAPI}/revista/articulosGet/?tipo=${idTipoUsuario}`,
{
  method: 'GET',
}).then(response => response.json());


const ArticulosPortada = (portada, idTipoUsuario) => fetch(`${CONSTANTES.URLAPI}/revista/articulosGet/?portada=${portada}&&tipo=${idTipoUsuario}`,
{
  method: 'GET',
}).then(response => response.json());


function* generadoraArticulosUsuario(values) {
    try {
        const portada = "True"
        const articulos_publicados = yield call(ArticulosPublicados, values.tipoUsuario);
        const articulos_portada = yield call(ArticulosPortada, portada, values.tipoUsuario);
        yield put(actionPutArticulosTipoUsuario(articulos_publicados, articulos_portada));

    } 
    catch (error) {
      console.log(error);  
    }
    }



//FUNCION GENERADORA DE ARTICULO SLUG
const ConsultaArticuloSlug = slug => fetch(`${CONSTANTES.URLAPI}/revista/articulonormal/?slug=${slug}`,
  {
    method: 'GET',
  }).then(response => response.json());


function* generadoraArticuloDetail(values) {
  try {
    const slug = values.slug
    console.log(slug)
    const articuloDetail = yield call(ConsultaArticuloSlug, slug);
    console.log(articuloDetail[0])
    yield put(actionPutArticuloDetail(articuloDetail[0]));
  } catch (error) {
    console.log(error);
  }
}
    
  
  export default function* SagasRevista() {
    yield takeEvery (CONSTANTES.GET_ARTICULOS_TIPO_USUARIO, generadoraArticulosUsuario)
    yield takeEvery (CONSTANTES.GET_ARTICULO_DETAIL, generadoraArticuloDetail)
    // yield takeEvery (CONSTANTES.GET_ARTICULOS, generadoraArticulos)
    // yield takeEvery (CONSTANTES.REGISTRANOTICIA, generadoraRegistroRevista)
    // yield takeEvery (CONSTANTES.ELIMINANOTICIA, generadoraEliminarNoticiaRevista)
    // yield takeEvery (CONSTANTES.EDITARNOTICIA, generadoraEditarNoticiaRevista)
    // yield takeEvery (CONSTANTES.REGISTROCATEGORIAREVISTA, generadoracategoria)


}