import CONSTANTES from '../Constantes';


export const actionLogin = datos => ({
    type: CONSTANTES.LOGIN,
    datos,
  });
 
export const actionEstablecerSesion = usuario => ({
    type: CONSTANTES.ESTABLECERSESION,
    usuario,
  
  });
  
  export const actionCerrarSesion = () => ({
    type: CONSTANTES.CERRARSESION,
  });
  
  export const actionGetUsuario = (usuario) => ({
    type: CONSTANTES.GETUSUARIO,
    usuario
})

export const actionObtenerUsuario = (profile) => ({
    type: CONSTANTES.OBTENERUSUARIO,
    profile
})