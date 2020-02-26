//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView,ActivityIndicator} from 'react-native';
import CardPublicacion from './Publicaciones/CardPublicacion';
import {connect} from 'react-redux'
import { actionGetArticulosTipoUsuario } from '../../Store/acciones/AccionesRevista';

class Home extends Component {

    render() {
        if(this.props.usuario){
            const {articulospublicados,navigation}=this.props
            return (
                <ScrollView style={styles.container} >
                    {articulospublicados && articulospublicados.length > 0
                        ? articulospublicados.map((c, key) => (
                            <CardPublicacion  key={key} {...c} navigation={navigation}/>
                        ))
                        : (
                            <View style={[styles.containerpreloader, styles.horizontal]}>
                                <ActivityIndicator size="large" color="#0000ff" />
                            </View>
                        )
                    }
              
                </ScrollView>
            );
        }
        else{
            return null
        }
        
    }
}
 
// define your styles
const styles = StyleSheet.create({
    container: {
        marginBottom:20
    },
    containerpreloader: {
        flex: 1,
        justifyContent: 'center'
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
      }
});

const mapStateToProps = (state) => {
    return {
        articulospublicados: state.reducerRevista.articulosPublicados,
        articulosportada: state.reducerRevista.articulosPortada,
        usuario: state.reducerUsuario.profile
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getArticulosTipoUsuario: (tipoUsuario) => {
            dispatch(actionGetArticulosTipoUsuario(tipoUsuario));  
      },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)