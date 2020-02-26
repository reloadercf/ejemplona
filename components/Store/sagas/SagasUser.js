import * as React from 'react';
import { Alert } from 'react-native';
import { takeEvery, call, select, put} from 'redux-saga/effects';
import CONSTANTES from '../Constantes';
import {autenticacion} from '../servicios/Firebase'
import { actionObtenerUsuario } from '../acciones/AccionesUsuario';
import AsyncStorage from '@react-native-community/async-storage';
import { actionPutArticulosTipoUsuario } from '../acciones/AccionesRevista';


const loginDjango=(datos)=> fetch(`${CONSTANTES.URLAPI}/api-token-auth/`,
{
  method: 'POST',
  body:JSON.stringify(datos),
  headers: new Headers({
    //'Authorization':'Token '+userToken,
    'Content-Type': 'application/json'
})
})
.then(response=>{
 
  return response.json()
})
.catch(e=>{
  console.log(e)
})

  
const loginFirebase=({firebase})=>autenticacion.signInWithCustomToken(firebase)
.then(success =>  success.user.toJSON());

userToken = async(key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    console.log(e)
  }
}

function* sagaLogin(values){
    try {
      const resultado=  yield call (loginDjango, values.datos) 
      const logfirebase=yield call(loginFirebase, resultado);
      if (logfirebase.uid) {
        userToken('userToken', logfirebase.uid)

        Alert.alert(
          "Importante",
          "Esta App utiliza información de tus clientes y tus polizas, te recordamos no compartir usuarios y contraseñas. Para administrar tu información ingresa a www.e-dipra.com",
          [
            { text: "Aceptar" }
          ],
          { cancelable: false }
        );
      }
      
    } catch (error) {
        console.log(error)
        Alert.alert(
          "Error",
          "Alguno de tus datos es incorrecto, verificalos para poder acceder",
          [
            { text: "Aceptar" }
          ],
          { cancelable: false }
        );
    }
  }


const getUsario=(token)=> fetch(`${CONSTANTES.URLAPI}/my_user/`,
{
  method: 'GET',
  headers: new Headers({
    'Authorization':'Token '+token,
    'Content-Type': 'application/json'
})
})
.then(response => response.json())
.catch(e=>{
  console.log(e)
})


const ArticulosPublicados = (idTipoUsuario) => fetch(`${CONSTANTES.URLAPI}/revista/articulosGet/?tipo=${idTipoUsuario}`,
{
  method: 'GET',
}).then(response => response.json());
 

const ArticulosPortada = (portada, idTipoUsuario) => fetch(`${CONSTANTES.URLAPI}/revista/articulosGet/?portada=${portada}&&tipo=${idTipoUsuario}`,
{
  method: 'GET',
}).then(response => {
  console.log("hola")
  return response.json()
})
.catch(e=>{
  console.log(e)
})


function* getUser(values){
    try {
      const token=values.usuario.uid
      const profile = yield call(getUsario, token);
      console.log(profile)
      yield put(actionObtenerUsuario(profile))
      const{profile_usuario:{tipoUsuario}}=profile
      const portada = "True"
      const articulos_publicados = yield call(ArticulosPublicados, tipoUsuario);
      const articulos_portada = yield call(ArticulosPortada, portada, tipoUsuario);
      yield put(actionPutArticulosTipoUsuario(articulos_publicados, articulos_portada));
    } catch (error) {
       console.log(error)
    }
  }




export default function* SagasUser() {
    yield takeEvery(CONSTANTES.LOGIN, sagaLogin)
    yield takeEvery(CONSTANTES.GETUSUARIO, getUser)
  }