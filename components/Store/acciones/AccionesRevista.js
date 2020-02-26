import CONSTANTES from '../Constantes';
//----------------------------------------------------------------------//
//--------------------------ACCIONES REVISTA----------------------------//
//----------------------------------------------------------------------//
export const actionGetArticulosTipoUsuario = (tipoUsuario) => ({
  type: CONSTANTES.GET_ARTICULOS_TIPO_USUARIO,
  tipoUsuario
})
export const actionPutArticulosTipoUsuario=(articulos_publicados,articulos_portada)=>({
  type:CONSTANTES.PUT_ARTICULOS_TIPO_USUARIO,
  articulos_publicados,
  articulos_portada 
})

export const actionGetArticulos=()=>({
  type:CONSTANTES.GET_ARTICULOS,
})

export const actionPutArticulos= (articulos) => ({
  type: CONSTANTES.PUT_ARTICULOS,
  articulos
})

export const actionPutCategorias = (categorias) => ({
  type: CONSTANTES.PUT_CATEGORIAS,
  categorias
})


export const actionGetArticuloDetail = slug => ({
  type: CONSTANTES.GET_ARTICULO_DETAIL,
  slug,
});

export const actionPutArticuloDetail = articulo => ({
  type: CONSTANTES.PUT_ARTICULO_DETAIL,
  articulo,
});

