import CONSTANTES from '../Constantes';
//----------------------------------------------------------------------//
//--------------------------ACCIONES CARTERA----------------------------//
//----------------------------------------------------------------------//

export const actionGetpolizasUsuario = (string) => ({
    type: CONSTANTES.GET_POLIZAS_USUARIO,
    string
})

export const actionPutpolizasUsuario = polizas => ({
    type: CONSTANTES.PUT_POLIZAS_USUARIO,
    polizas
})

//-------------ACCIONES GET POLIZAS CARTERA -------------//
export const actionGetPolizasUsuarioCartera = (token,string) => ({
    type: CONSTANTES.GET_POLIZAS_USUARIO_CARTERA,
    token,
    string
})
export const actionPutPolizasUsuarioCartera = (polizas) => ({
    type: CONSTANTES.PUT_POLIZAS_USUARIO_CARTERA,
    polizas
})

//-------------ACCIONES GET CLIENTES CARTERA -------------//
export const actionGetClientesUsuarioCartera = (token,string) => ({
    type: CONSTANTES.GET_CLIENTES_USUARIO_CARTERA,
    token,
    string
})
export const actionPutClientesUsuarioCartera = (clientes) => ({
    type: CONSTANTES.PUT_CLIENTES_USUARIO_CARTERA,
    clientes
})


//-------------ACCIONES GET PROSPECTOS CARTERA -------------//
export const actionGetProspectosUsuarioCartera = (string) => ({
    type: CONSTANTES.GET_PROSPECTOS_USUARIO_CARTERA,
    string
})
export const actionPutProspectosUsuarioCartera = (prospectos) => ({
    type: CONSTANTES.PUT_PROSPECTOS_USUARIO_CARTERA,
    prospectos
})



//-------------ACCIONES GET POLIZA DETAIL -------------//
export const actionGetpolizaDetail = (idPoliza) => ({
    type: CONSTANTES.GET_POLIZA_DETAIL,
    idPoliza
})

export const actionPutpolizaDetail = (poliza) => ({
    type: CONSTANTES.PUT_POLIZA_DETAIL,
    poliza
})

export const actionGetRecibosPoliza = (idPoliza,renovacion) => ({
    type: CONSTANTES.GETRECIBOSENPOLIZA,
    idPoliza,
    renovacion
  })
export const actionObtenerRecibosPoliza = (recibos) => ({
      type: CONSTANTES.OBTENERRECIBOSENPOLIZA,
      recibos  
  });


  export const actionGetArchivosPoliza=(idPoliza)=>({
    type:CONSTANTES.GET_ARCHIVOS_POLIZA,
    idPoliza
})

export const actionPutArchivosPoliza=(archivosPoliza)=>({
    type:CONSTANTES.PUT_ARCHIVOS_POLIZA,
    archivosPoliza
})

export const actionGetObjetoVehiculo = (id) => ({
    type: CONSTANTES.GETOBJETOVEHICULO,
    id
  })
export const obtenerObjetoVehiculo = (id) => ({
      type: CONSTANTES.OBTENEROBJETOVEHICULO,
    id  
  });