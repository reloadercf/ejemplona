import { takeEvery, call, select, put } from 'redux-saga/effects';
import CONSTANTES from '../Constantes';
import { actionPutpolizasUsuario, actionPutpolizaDetail, actionObtenerRecibosPoliza, actionPutPolizasUsuarioCartera, actionPutArchivosPoliza, actionPutClientesUsuarioCartera,obtenerObjetoVehiculo } from '../acciones/AccionesCartera';
import AsyncStorage from '@react-native-community/async-storage';


let PolizasUsuario = (idUsuario, idProfile) => fetch(`${CONSTANTES.URLAPI}/polizas/get-poliza/?profile=${idProfile}&usuario=${idUsuario}`,
  {
    method: 'GET',
  }).then(response => response.json());

  let PolizasUsuarioFilterString = (idUsuario, idProfile, string) => fetch(`${CONSTANTES.URLAPI}/polizas/get-poliza/?profile=${idProfile}&usuario=${idUsuario}&string=${string}`,
  {
    method: 'GET',
  }).then(response => response.json());


function* generadoraPolizasUsuario(values) {
    try {
      const usuario = yield select(state => state.reducerUsuario.profile)
      const { id, profile_usuario } = usuario
      let polizas = []
      if (values.string) {
        polizas = yield call(PolizasUsuarioFilterString, id, profile_usuario.id, values.string)
        yield put(actionPutpolizasUsuario(polizas))
      }
      else {
        polizas = yield call(PolizasUsuario, id, profile_usuario.id)
        yield put(actionPutpolizasUsuario(polizas))
      }
    } catch (error) {
        console.log(error)
    }
}

let PolizaDetail = (idPoliza) => fetch(`${CONSTANTES.URLAPI}/polizas/get-poliza-detail/${idPoliza}/`,
  {
    method: 'GET',
  }).then(response => response.json());

  

  let RecibosDePolizas = (idProfile,id,renovacion) => fetch(`${CONSTANTES.URLAPI}/polizas/get-recibo/?profile=${idProfile}&id=${id}&renovacion=${renovacion}`,
  {
    method: 'GET',
  }).then(response => response.json());

  

function* generadoraPolizaDetail(values){
    try 
    {
      const idPoliza=values.idPoliza
      let polizaDetail=yield call(PolizaDetail,idPoliza)
      const usuario = yield select(state => state.reducerUsuario.profile)
      console.log(polizaDetail)
      yield put(actionPutpolizaDetail(polizaDetail))
     //const recibosDePoliza=yield call(RecibosDePolizas, usuario.profile_usuario.id, polizaDetail.id, polizaDetail.numero_renovacion)
      // recibosDePoliza.sort(function(a,b){
      //   // Turn your strings into dates, and then subtract them
      //   // to get a value that is either negative, positive, or zero.
      //   return new Date(b.fecha_inicio) - new Date(a.fecha_inicio);
      // });
      // console.log(recibosDePoliza)


      //yield put(actionObtenerRecibosPoliza(recibosDePoliza)) 
    } catch (error) {
      console.log(error)
    }
  }


function* generadoraRecibosDePolizas(values){
 try 
 {
   console.log(values)
   const usuario = yield select(state => state.reducerUsuario.profile)
   console.log(usuario.profile_usuario.id)
   let recibos=yield call(RecibosDePolizas, usuario.profile_usuario.id, values.idPoliza, values.renovacion)

   recibos.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return  new Date(a.fecha_inicio) - new Date(b.fecha_inicio) ;
  });
   console.log(recibos)

   yield put(actionObtenerRecibosPoliza(recibos)) 
 } catch (error) 
 {
    console.log(error)
 }
}    



let PolizasUsuarioCartera = (userToken) => fetch(`${CONSTANTES.URLAPI}/cartera/get-poliza-other/`,
  {
    method: 'GET',
    headers: new Headers({
        'Authorization':'Token '+ userToken,
        'Content-Type': 'application/json'
    })
  }).then(response => response.json());

let PolizasUsuarioCarteraFilterString = (userToken, string) => fetch(`${CONSTANTES.URLAPI}/cartera/get-poliza-other/?string=${string}`,
    {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Token '+ userToken,
            'Content-Type': 'application/json'
        })
    }).then(response => response.json());


  
function* generadoraPolizasCarteraUsuario(values) {
    try {
        let userToken=values.token

        let polizas = []
        if (values.string) {
            polizas = yield call(PolizasUsuarioCarteraFilterString, userToken, values.string)
            yield put(actionPutPolizasUsuarioCartera(polizas))
        }
        else {
            polizas = yield call(PolizasUsuarioCartera, userToken)
            yield put(actionPutPolizasUsuarioCartera(polizas))
        }
    } catch (error) {
        console.log(error)
    }
}



let ArchivosPoliza = (idPoliza) => fetch(`${CONSTANTES.URLAPI}/polizas/archivos-poliza/?idPoliza=${idPoliza}`,
  {
    method: 'GET',
  }).then(response => response.json());


function* generadoraGetArchivosPoliza(values) {
  try {
    const archivos = yield call(ArchivosPoliza, values.idPoliza)
    yield put(actionPutArchivosPoliza(archivos))
  } catch (error) {
    console.log("error al traer el cliente de sagas")
  }
} 



let ClientesUsuarioCartera = (userToken) => fetch(`${CONSTANTES.URLAPI}/cartera/cliente/`,
    {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Token ' + userToken,
            'Content-Type': 'application/json'
        })
    }).then(response => response.json());

let ClientesUsuarioCarteraFilter = (userToken, string) => fetch(`${CONSTANTES.URLAPI}/cartera/cliente/?string=${string}`,
    {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Token ' + userToken,
            'Content-Type': 'application/json'
        })
    }).then(response => response.json());

    
function* generadoraUsuarioClientesCartera(values) {
  try {
      const userToken = values.token
      let clientes = []
      if (values.string) {
          console.log(values.string)
          clientes = yield call(ClientesUsuarioCarteraFilter, userToken, values.string)
          yield put(actionPutClientesUsuarioCartera(clientes))
      }
      else 
      {
          clientes = yield call(ClientesUsuarioCartera,userToken)
          yield put(actionPutClientesUsuarioCartera(clientes))
      }
      
  } catch (error) {
      console.log(error)
  }
  
}

let ObjetoVehiculoPoliza = (id) => fetch(`${CONSTANTES.URLAPI}/polizas/post-objeto-vehiculo/?id=${id}`,
 {
   method: 'GET',
 }).then(response => response.json());


function* generadoraObjetoVehiculoPoliza(values){
  try 
  {
    let invocacion=yield call(ObjetoVehiculoPoliza,values.id)
    yield put(obtenerObjetoVehiculo(invocacion)) 
  } catch (error) {
    console.log("error al traer objeto vehiculo del la poliza en sagas")
  }
} 


export default function* SagasCartera() {
    yield takeEvery (CONSTANTES.GET_POLIZAS_USUARIO, generadoraPolizasUsuario)
    yield takeEvery (CONSTANTES.GET_POLIZA_DETAIL, generadoraPolizaDetail)
    yield takeEvery (CONSTANTES.GETRECIBOSENPOLIZA, generadoraRecibosDePolizas )
    yield takeEvery (CONSTANTES.GET_POLIZAS_USUARIO_CARTERA, generadoraPolizasCarteraUsuario)
    yield takeEvery (CONSTANTES.GET_ARCHIVOS_POLIZA, generadoraGetArchivosPoliza)
    yield takeEvery (CONSTANTES.GET_CLIENTES_USUARIO_CARTERA, generadoraUsuarioClientesCartera)
    yield takeEvery (CONSTANTES.GETOBJETOVEHICULO, generadoraObjetoVehiculoPoliza)
    
}

