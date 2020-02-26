import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
//import { Button } from 'react-native-paper';
import {connect} from 'react-redux'
import SignInForm from './Forms/SignInForm';
import { actionLogin } from '../Store/acciones/AccionesUsuario';
import AsyncStorage from '@react-native-community/async-storage';
import logo from '../assets/logo2.png'

// create a component
class SignIn extends Component {
    
    signDeUsuario= async(values) => {
        this.props.login(values);
        const userToken = await AsyncStorage.getItem('userToken');
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
      }
    render() {
      
        return (
            <View style={styles.container}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.texto}>Inicia sesión</Text>
                <View style={{ width: "100%" }}>
                    <SignInForm login={this.signDeUsuario} />
                </View>
            </View>
        );
    }
}


// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffff',
        paddingHorizontal:  15,
        alignItems: 'center',
    },
    logo:{
        width: 350,
        height:100
      
    },
    texto:{
        fontSize:20,
        marginVertical:10,
        letterSpacing:5,
        fontWeight:"bold",
        color:"#000"
    }
});


const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (datos) => {
            dispatch(actionLogin(datos));
          },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
