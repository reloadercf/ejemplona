// import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { autenticacion } from './Store/servicios/Firebase'
import { actionCerrarSesion, actionGetUsuario } from './Store/acciones/AccionesUsuario';
import RutasAutenticadas from './Autenticados/RutasAutenticadas';


// create a component
class Principal extends Component {

  componentDidMount() {
    this.props.autenticacion();
  }

  render() {
    console.log(this.props.userProfile)
    return (
      <View style={styles.container}>
          <RutasAutenticadas  />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = state => ({
  usuario: state.reducerSesion,
  userProfile:state.reducerUsuario.profile
});
const mapDispatchToProps = dispatch => ({
  autenticacion: () => {
    autenticacion.onAuthStateChanged((usuario) => {
      if (usuario) {
        dispatch(actionGetUsuario(usuario))
      } else {
        dispatch(actionCerrarSesion(usuario));
      }
    });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Principal);
